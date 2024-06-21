const mysql = require('mysql2/promise');
const axios = require('axios');
const AWS = require('aws-sdk');

// TODO: Change information to suit your account
const mysqlHost =
  'store.cluster-c9piytoc4vtx.ap-northeast-2.rds.amazonaws.com';
const openSearchHost =
  'https://vpc-store-znt3kjbc5nszf3eib44pxdlwva.ap-northeast-2.es.amazonaws.com'; // OpenSearch id
const verifyEmail = 'ld5ehom@gmail.com';
const sendMailOff = true;

// AWS SES
const ses = new AWS.SES({
  region: 'ap-northeast-2',
});

// MySQL
const connectionConfig = {
  host: mysqlHost,
  user: 'store',
  password: 'store1!',
  database: 'store',
};

// OpenSearch
const openSearchIndex = 'goods-item'; // index name
const openSearchUrl = `${openSearchHost}`;
const axiosConfig = {
  auth: {
    username: 'store',
    password: 'store1!',
  },
};

// Lambda handler
exports.handler = async (event) => {
  console.log('event= ', event);
  if (!event.Records) {
    return 'Not Exists Message';
  }

  for (const record of event.Records) {
    await processMessage(record.body);
  }
  return 'Success Processing For Message';
};

const processMessage = async (message) => {
  // message = "goodsItemId/username" => EX) "1/gnidoc"
  const goodsItemId = message.split('/')[0];
  const username = message.split('/')[1];

  // MySQL
  const queryString = 'SELECT * FROM goods_item WHERE id = ?';
  const connection = await mysql.createConnection(connectionConfig);

  const [rows] = await connection.execute(queryString, [goodsItemId]);
  if (rows.length == 0) {
    throw error;
  }

  const goodsItem = rows[0];
  const openSearchRes = await axios.post(
    `${openSearchUrl}/store/_doc/${goodsItem.id}`,
    goodsItem,
    axiosConfig
  );
  console.log('openSearchRes=', openSearchRes);

  const subject = `store 상품 등록 알림(${username})`;
  const body = `상품명: ${goodsItem.name}\n상품정보: ${goodsItem.description}`;
  const sendMailRes = await sendMail(subject, body);
  console.log('sendMailRes=', sendMailRes);
  await connection.end();
};

const sendMail = async (subject, body) => {
  if (sendMailOff) {
    return 'Success';
  }
  // email
  const params = {
    Destination: {
      ToAddresses: [verifyEmail],
    },
    Message: {
      Body: {
        Text: {
          Data: body,
          Charset: 'UTF-8',
        },
      },
      Subject: {
        Data: subject, // email title
        Charset: 'UTF-8',
      },
    },
    Source: verifyEmail, // email address
  };
  await ses
    .sendEmail(params)
    .promise()
    .then((res) => {
      return `Success to ${res.MessageId}`;
    })
    .catch((err) => {
      return 'Error';
    });
  return 'Success';
};
