// utils/api/request.ts
export interface ApiResponse<T = any> {
  code: number;
  data: T;
  message: string;
  success: boolean;
}

export interface RequestConfig {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  body?: any;
  timeout?: number;
}

class ApiClient {
  private baseURL: string;
  private defaultTimeout: number = 10000;

  constructor(baseURL: string = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001/api') {
    this.baseURL = baseURL;
  }

  private async request<T>(endpoint: string, config: RequestConfig = {}): Promise<ApiResponse<T>> {
    const {
      method = 'GET',
      headers = {},
      body,
      timeout = this.defaultTimeout
    } = config;

    const url = `${this.baseURL}${endpoint}`;
    
    const defaultHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
      ...headers
    };

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(url, {
        method,
        headers: defaultHeaders,
        body: body ? JSON.stringify(body) : undefined,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: ApiResponse<T> = await response.json();
      return result;
    } catch (error) {
      clearTimeout(timeoutId);
      
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw new Error('Request timeout');
        }
        throw error;
      }
      
      throw new Error('Unknown error occurred');
    }
  }

  async get<T>(endpoint: string, headers?: Record<string, string>): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET', headers });
  }

  async post<T>(endpoint: string, body?: any, headers?: Record<string, string>): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'POST', body, headers });
  }

  async put<T>(endpoint: string, body?: any, headers?: Record<string, string>): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'PUT', body, headers });
  }

  async delete<T>(endpoint: string, headers?: Record<string, string>): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE', headers });
  }
}

export const apiClient = new ApiClient();

// utils/api/category.ts
export interface CategoryItem {
  id: number;
  name: string;
  code?: string;
  path?: string;
  isActive?: boolean;
  sort?: number;
  status?: 'active' | 'inactive';
  createdAt?: string;
  updatedAt?: string;
}

export interface CategoryListParams {
  status?: 'active' | 'inactive';
  limit?: number;
  offset?: number;
}

/**
 * 获取分类列表
 * @param params 查询参数
 * @returns Promise<ApiResponse<CategoryItem[]>>
 */
export async function getCategoryList(params?: CategoryListParams): Promise<ApiResponse<CategoryItem[]>> {
  try {
    // 构建查询参数
    const queryParams = new URLSearchParams();
    if (params?.status) queryParams.append('status', params.status);
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.offset) queryParams.append('offset', params.offset.toString());
    
    const queryString = queryParams.toString();
    const endpoint = `/categories${queryString ? `?${queryString}` : ''}`;
    
    const response = await apiClient.get<CategoryItem[]>(endpoint);
    
    // 验证响应数据
    if (!response.success || !Array.isArray(response.data)) {
      throw new Error('Invalid response format');
    }
    
    return response;
  } catch (error) {
    console.error('Failed to fetch categories:', error);
    
    // 返回错误响应格式，保持接口一致性
    return {
      code: 500,
      data: [],
      message: error instanceof Error ? error.message : 'Failed to fetch categories',
      success: false
    };
  }
}

/**
 * 获取单个分类详情
 * @param id 分类ID
 * @returns Promise<ApiResponse<CategoryItem>>
 */
export async function getCategoryById(id: number): Promise<ApiResponse<CategoryItem>> {
  try {
    const response = await apiClient.get<CategoryItem>(`/categories/${id}`);
    return response;
  } catch (error) {
    console.error(`Failed to fetch category ${id}:`, error);
    
    return {
      code: 500,
      data: {} as CategoryItem,
      message: error instanceof Error ? error.message : 'Failed to fetch category',
      success: false
    };
  }
}

/**
 * 创建新分类
 * @param categoryData 分类数据
 * @returns Promise<ApiResponse<CategoryItem>>
 */
export async function createCategory(categoryData: Omit<CategoryItem, 'id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<CategoryItem>> {
  try {
    const response = await apiClient.post<CategoryItem>('/categories', categoryData);
    return response;
  } catch (error) {
    console.error('Failed to create category:', error);
    
    return {
      code: 500,
      data: {} as CategoryItem,
      message: error instanceof Error ? error.message : 'Failed to create category',
      success: false
    };
  }
}

/**
 * 更新分类
 * @param id 分类ID
 * @param categoryData 更新的分类数据
 * @returns Promise<ApiResponse<CategoryItem>>
 */
export async function updateCategory(id: number, categoryData: Partial<CategoryItem>): Promise<ApiResponse<CategoryItem>> {
  try {
    const response = await apiClient.put<CategoryItem>(`/categories/${id}`, categoryData);
    return response;
  } catch (error) {
    console.error(`Failed to update category ${id}:`, error);
    
    return {
      code: 500,
      data: {} as CategoryItem,
      message: error instanceof Error ? error.message : 'Failed to update category',
      success: false
    };
  }
}

/**
 * 删除分类
 * @param id 分类ID
 * @returns Promise<ApiResponse<void>>
 */
export async function deleteCategory(id: number): Promise<ApiResponse<void>> {
  try {
    const response = await apiClient.delete<void>(`/categories/${id}`);
    return response;
  } catch (error) {
    console.error(`Failed to delete category ${id}:`, error);
    
    return {
      code: 500,
      data: undefined,
      message: error instanceof Error ? error.message : 'Failed to delete category',
      success: false
    };
  }
}