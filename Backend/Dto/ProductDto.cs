﻿using Backend.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel;

namespace Backend.Dto
{
    public class ProductDto
    {

        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }
        public string SKU { get; set; }
        public string Image { get; set; }
        public string? CategoryName  { get; set; }
        public string? BrandName { get; set; }
        public Boolean Status { get; set; }
        public int? CategoryId { get; set; }
        public int? BrandId { get; set; }
    }
}
