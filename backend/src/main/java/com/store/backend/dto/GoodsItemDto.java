package com.store.backend.dto;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
public class GoodsItemDto {
    private String name;
    private String description;
    private Integer price;
}
