import type { RootState } from '@/lib/store';
import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface Category {
  id: string;
  name: string;
  description: string | null;
  image: string;
  createdAt: string;
  updatedAt?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  images: string[];
  price: number;
  slug: string;
  createdAt: string;
  updatedAt: string;
  category: Category;
}

interface ProductsState {
  products: Product[];
  currentProduct: Product | null;
  loading: boolean;
  error: string | null;
  totalProducts: number;
  currentPage: number;
  limit: number;
  searchQuery: string;
  selectedCategoryId: string | null;
}

const initialState: ProductsState = {
  products: [],
  currentProduct: null,
  loading: false,
  error: null,
  totalProducts: 0,
  currentPage: 1,
  limit: 10,
  searchQuery: '',
  selectedCategoryId: null,
};

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (
    { offset, limit, categoryId }: { offset: number; limit: number; categoryId?: string },
    { getState, rejectWithValue }
  ) => {
    try {
      const state = getState() as RootState;
      const token = state.auth.token;

      let url = `https://api.bitechx.com/products?offset=${offset}&limit=${limit}`;
      if (categoryId) {
        url += `&categoryId=${categoryId}`;
      }

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue('Failed to fetch products');
    }
  }
);

export const searchProducts = createAsyncThunk(
  'products/searchProducts',
  async (searchText: string, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const token = state.auth.token;

      const response = await fetch(
        `https://api.bitechx.com/products/search?searchedText=${encodeURIComponent(searchText)}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to search products');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue('Failed to search products');
    }
  }
);

export const fetchProductBySlug = createAsyncThunk(
  'products/fetchProductBySlug',
  async (slug: string, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const token = state.auth.token;

      const response = await fetch(`https://api.bitechx.com/products/${slug}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch product');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue('Failed to fetch product');
    }
  }
);

export const createProduct = createAsyncThunk(
  'products/createProduct',
  async (
    productData: {
      name: string;
      description: string;
      images: string[];
      price: number;
      categoryId: string;
    },
    { getState, rejectWithValue }
  ) => {
    try {
      const state = getState() as RootState;
      const token = state.auth.token;

      const response = await fetch('https://api.bitechx.com/products', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        throw new Error('Failed to create product');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue('Failed to create product');
    }
  }
);

export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async (
    { id, productData }: { id: string; productData: Partial<Product> },
    { getState, rejectWithValue }
  ) => {
    try {
      const state = getState() as RootState;
      const token = state.auth.token;

      const response = await fetch(`https://api.bitechx.com/products/${id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        throw new Error('Failed to update product');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue('Failed to update product');
    }
  }
);

export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (id: string, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const token = state.auth.token;

      const response = await fetch(`https://api.bitechx.com/products/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete product');
      }

      return id;
    } catch (error) {
      return rejectWithValue('Failed to delete product');
    }
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setSelectedCategoryId: (state, action: PayloadAction<string | null>) => {
      state.selectedCategoryId = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    clearCurrentProduct: (state) => {
      state.currentProduct = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.loading = false;
        state.products = action.payload;
        state.totalProducts = action.payload.length;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Search products
      .addCase(searchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(searchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch product by slug
      .addCase(fetchProductBySlug.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductBySlug.fulfilled, (state, action: PayloadAction<Product>) => {
        state.loading = false;
        state.currentProduct = action.payload;
      })
      .addCase(fetchProductBySlug.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Create product
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action: PayloadAction<Product>) => {
        state.loading = false;
        state.products.unshift(action.payload);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Update product
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action: PayloadAction<Product>) => {
        state.loading = false;
        const index = state.products.findIndex((p) => p.id === action.payload.id);
        if (index !== -1) {
          state.products[index] = action.payload;
        }
        if (state.currentProduct?.id === action.payload.id) {
          state.currentProduct = action.payload;
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Delete product
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.products = state.products.filter((p) => p.id !== action.payload);
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  setSearchQuery,
  setSelectedCategoryId,
  setCurrentPage,
  clearCurrentProduct,
  clearError,
} = productsSlice.actions;
export default productsSlice.reducer;
