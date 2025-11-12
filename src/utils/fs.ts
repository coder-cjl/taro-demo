import Taro from '@tarojs/taro'

export function checkFileExists(path: string): boolean {
  try {
    const fs = Taro.getFileSystemManager()
    fs.accessSync(path)
    return true
  } catch {
    return false
  }
}

export function readFileContent(
  path: string,
  encoding: 'utf8' | 'base64' = 'utf8'
): string | ArrayBuffer | null {
  try {
    const fs = Taro.getFileSystemManager()
    const content = fs.readFileSync(path, encoding)
    return content
  } catch {
    return null
  }
}

export function writeFileContent(
  path: string,
  data: string | ArrayBuffer,
  encoding: 'utf8' | 'base64' = 'utf8'
): boolean {
  try {
    const fs = Taro.getFileSystemManager()
    fs.writeFileSync(path, data, encoding)
    return true
  } catch {
    return false
  }
}

export function deleteFile(path: string): boolean {
  try {
    const fs = Taro.getFileSystemManager()
    fs.unlinkSync(path)
    return true
  } catch {
    return false
  }
}
