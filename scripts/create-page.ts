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

  console.log('\n✅ 页面创建成功!')
  console.log(`\n📝 下一步: 在 app.config.ts 中添加页面路由:`)
  console.log(`   pages: [`)
  console.log(`     ...`)
  console.log(`     'pages/${pageName}/index',`)
  console.log(`   ]`)
  console.log(`\n📂 页面路径: src/pages/${pageName}/`)
} catch (error) {
  console.error('❌ 创建页面失败:', error)
  process.exit(1)
}
