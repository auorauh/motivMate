import storage from "@react-native-async-storage/async-storage";

export async function deleteLocalData(key) {
    try {
      const result = await storage.removeItem(key);
      return true;
    } catch (error) {
        return null;
    }
  }
export  async function saveLocalData(key, value) {
    try {
      await storage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
        return null;
    }
  }
export  async function getLocalData(key) {
    try {
      const value = await storage.getItem(key);
      return value != null ? JSON.parse(value) : null;
    } catch (error) {
        return null;
    }
  }