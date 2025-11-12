import * as fs from 'fs'
import * as path from 'path'

// 获取页面名称参数
const pageName = process.argv[2]

if (!pageName) {
  console.error('❌ 请提供页面名称!')
  console.log('使用方法: npm run create:page <pageName>')
  console.log('示例: npm run create:page mine')
  process.exit(1)
}

// 定义路径
const pagesDir = path.resolve(__dirname, '../src/pages')
const pageDir = path.join(pagesDir, pageName)

// 检查页面是否已存在
if (fs.existsSync(pageDir)) {
  console.error(`❌ 页面 "${pageName}" 已存在!`)
  process.exit(1)
}

// 创建页面目录
fs.mkdirSync(pageDir, { recursive: true })

// 页面名称首字母大写
const PageName = pageName.charAt(0).toUpperCase() + pageName.slice(1)

// ============ 模板内容 ============

// index.tsx 模板
const indexTsxContent = `import { View } from '@tarojs/components'
import LucaColumn from 'src/components/globals/column'
import LucaText from 'src/components/globals/text'
import use${PageName}Logic from './logic'

export default function ${PageName}Page() {
  const logic = use${PageName}Logic()

  return (
    <View>
      <LucaColumn style={{ padding: '20px' }}>
        <LucaText size="20px" weight="bold">
          ${PageName} 页面
        </LucaText>
        <LucaText color="#666">
          这是 ${pageName} 页面的内容
        </LucaText>
      </LucaColumn>
    </View>
  )
}
`

// index.config.ts 模板
const indexConfigContent = `export default definePageConfig({
  navigationBarTitleText: '${PageName}'
})
`

// logic.ts 模板
const logicContent = `import { useState } from 'react'
import { useNavigateRouter } from 'src/routers/navigate'

// 页面路由常量
export const ${pageName}RouteName = '/pages/${pageName}/index'

export default function use${PageName}Logic() {
  const router = useNavigateRouter()

  // 示例状态
  const [loading, setLoading] = useState(false)

  // 示例方法
  const handleClick = () => {
    console.log('${PageName} page clicked')
  }

  return {
    loading,
    handleClick,
  }
}
`

// index.less 模板 (可选)
// const indexLessContent = `.${pageName}-page {
//   padding: 20px;

//   &__title {
//     font-size: 20px;
//     font-weight: bold;
//   }

//   &__content {
//     margin-top: 16px;
//     color: #666;
//   }
// }
// `

// ============ 写入文件 ============

try {
  // 创建 index.tsx
  fs.writeFileSync(path.join(pageDir, 'index.tsx'), indexTsxContent)
  console.log(`✅ 创建 ${pageName}/index.tsx`)

  // 创建 index.config.ts
  fs.writeFileSync(path.join(pageDir, 'index.config.ts'), indexConfigContent)
  console.log(`✅ 创建 ${pageName}/index.config.ts`)

  // 创建 logic.ts
  fs.writeFileSync(path.join(pageDir, 'logic.ts'), logicContent)
  console.log(`✅ 创建 ${pageName}/logic.ts`)

  // 创建 index.less (可选)
  //   fs.writeFileSync(path.join(pageDir, 'index.less'), indexLessContent)
  //   console.log(`✅ 创建 ${pageName}/index.less`)

  // 自动添加路由到 app.config.ts
  const appConfigPath = path.resolve(__dirname, '../src/app.config.ts')
  if (fs.existsSync(appConfigPath)) {
    let appConfig = fs.readFileSync(appConfigPath, 'utf-8')
    const pageRoute = `pages/${pageName}/index`

    // 检查路由是否已存在
    if (!appConfig.includes(pageRoute)) {
      // 查找 pages 数组的结束位置 ]
      const pagesMatch = appConfig.match(/pages:\s*\[([\s\S]*?)\]/)
      if (pagesMatch) {
        const pagesContent = pagesMatch[1]
        // 在数组末尾添加新路由
        const newPagesContent = pagesContent.trim()
          ? `${pagesContent.trimEnd()},\n    '${pageRoute}'`
          : `\n    '${pageRoute}'\n  `

        appConfig = appConfig.replace(/pages:\s*\[([\s\S]*?)\]/, `pages: [${newPagesContent}]`)

        fs.writeFileSync(appConfigPath, appConfig)
        console.log(`✅ 自动添加路由到 app.config.ts`)
      } else {
        console.log(`⚠️  未找到 pages 数组,请手动添加路由: 'pages/${pageName}/index'`)
      }
    } else {
      console.log(`ℹ️  路由已存在于 app.config.ts`)
    }
  }

  console.log('\n✅ 页面创建成功!')
  console.log(`\n📂 页面路径: src/pages/${pageName}/`)
  console.log(`🔗 路由地址: pages/${pageName}/index`)
} catch (error) {
  console.error('❌ 创建页面失败:', error)
  process.exit(1)
}
