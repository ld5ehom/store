package com.store.backend.repository;

import com.store.backend.entity.GoodsItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface GoodsItemRepository extends JpaRepository<GoodsItem, Long> {}