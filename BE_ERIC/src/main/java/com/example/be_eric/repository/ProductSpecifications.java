package com.example.be_eric.repository;

import com.example.be_eric.models.Product.Product;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.ArrayList;
import java.util.List;



public class ProductSpecifications {

    public static Specification<Product> searchAndFilter(String keyword, String[] types, String[] brands, Double  minPrice, Double  maxPrice) {
        return (root, query, builder) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (keyword != null ) {
                Predicate keywordPredicate = containsKeyword(keyword).toPredicate(root, query, builder);
                predicates.add(keywordPredicate);
            }

            if (types != null && types.length > 0) {
                Predicate typePredicate = filterByType(types).toPredicate(root, query, builder);
                predicates.add(typePredicate);
            }

            if (brands != null && brands.length > 0) {
                Predicate brandPredicate = filterByBrand(brands).toPredicate(root, query, builder);
                predicates.add(brandPredicate);
            }

            if (minPrice != null || maxPrice != null) {
                Predicate pricePredicate = filterByPriceRange(minPrice, maxPrice).toPredicate(root, query, builder);
                predicates.add(pricePredicate);
            }

            return builder.and(predicates.toArray(new Predicate[0]));
        };
    }

    private static Specification<Product> containsKeyword(String keyword) {
        return (root, query, builder) -> {
            String likePattern = "%" + keyword + "%";
            Predicate namePredicate = builder.like(root.get("name"), likePattern);
            Predicate descriptionPredicate = builder.like(root.get("description"), likePattern);
            return builder.or(namePredicate, descriptionPredicate);
        };
    }

    private static Specification<Product> filterByType(String[] types) {
        return (root, query, builder) -> root.get("type").in((Object[]) types);
    }

    private static Specification<Product> filterByBrand(String[] brands) {
        return (root, query, builder) -> root.get("brand").in((Object[]) brands);
    }

    private static Specification<Product> filterByPriceRange( Double  minPrice, Double  maxPrice) {
        return (root, query, builder) -> {
            List<Predicate> pricePredicates = new ArrayList<>();
            if (minPrice != null) {
                Predicate minPricePredicate = builder.greaterThanOrEqualTo(root.get("price"), minPrice);
                pricePredicates.add(minPricePredicate);
            }
            if (maxPrice != null) {
                Predicate maxPricePredicate = builder.lessThanOrEqualTo(root.get("price"), maxPrice);
                pricePredicates.add(maxPricePredicate);
            }
            return builder.and(pricePredicates.toArray(new Predicate[0]));
        };
    }
}
