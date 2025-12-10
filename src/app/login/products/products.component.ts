import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { ProductlistComponent } from '../productlist/productlist.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, ProductlistComponent],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: any[] = [];
  loading: boolean = true;
  error: string = '';
  showCart: boolean = false;
  cartItems: any[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.fetchProducts();
    // Subscribe to cart updates
    this.cartService.cart$.subscribe(items => {
      this.cartItems = items;
    });
  }

  fetchProducts() {
    fetch('https://api.escuelajs.co/api/v1/products')
      .then(response => response.json())
      .then(data => {
        // Map the data to ensure we have image URLs
        this.products = data.map((product: any) => ({
          ...product,
          // Use first image if images is an array, otherwise use image field
          image: product.images && product.images[0] 
            ? (product.images[0].startsWith('http') ? product.images[0] : product.images[0])
            : product.image
        }));
        this.loading = false;
      })
      .catch(err => {
        this.error = 'Failed to load products';
        this.loading = false;
        console.error(err);
      });
  }

  addToCart(product: any) {
    this.cartService.addToCart(product);
    alert(`${product.title} added to cart!`);
  }

  toggleCart() {
    this.showCart = !this.showCart;
  }
}
