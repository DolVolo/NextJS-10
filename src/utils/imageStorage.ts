// utils/imageStorage.ts
'use client';

interface StoredImage {
  id: string;
  filename: string;
  data: Blob;
  uploadedAt: string;
}

class ImageStorageDB {
  private dbName = 'portfolio-images';
  private version = 1;
  private storeName = 'images';

  private async getDB(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version);
      
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
      
      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(this.storeName)) {
          const store = db.createObjectStore(this.storeName, { keyPath: 'id' });
          store.createIndex('filename', 'filename', { unique: false });
        }
      };
    });
  }

  async saveImage(file: File): Promise<string> {
    const db = await this.getDB();
    const id = crypto.randomUUID();
    
    const imageData: StoredImage = {
      id,
      filename: file.name,
      data: file,
      uploadedAt: new Date().toISOString()
    };

    return new Promise((resolve, reject) => {
      const transaction = db.transaction([this.storeName], 'readwrite');
      const store = transaction.objectStore(this.storeName);
      const request = store.add(imageData);
      
      request.onsuccess = () => resolve(id);
      request.onerror = () => reject(request.error);
    });
  }

  async getImage(id: string): Promise<string | null> {
    const db = await this.getDB();
    
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([this.storeName], 'readonly');
      const store = transaction.objectStore(this.storeName);
      const request = store.get(id);
      
      request.onsuccess = () => {
        const result = request.result as StoredImage;
        if (result) {
          const url = URL.createObjectURL(result.data);
          resolve(url);
        } else {
          resolve(null);
        }
      };
      request.onerror = () => reject(request.error);
    });
  }

  async deleteImage(id: string): Promise<void> {
    const db = await this.getDB();
    
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([this.storeName], 'readwrite');
      const store = transaction.objectStore(this.storeName);
      const request = store.delete(id);
      
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async getAllImages(): Promise<StoredImage[]> {
    const db = await this.getDB();
    
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([this.storeName], 'readonly');
      const store = transaction.objectStore(this.storeName);
      const request = store.getAll();
      
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }
}

export const imageStorage = new ImageStorageDB();

// Usage example:
// const imageId = await imageStorage.saveImage(file);
// const imageUrl = await imageStorage.getImage(imageId);
// In your data: { images: ['stored-uuid-1', 'stored-uuid-2'] }