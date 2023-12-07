import { ref } from 'vue'
import { defineStore } from 'pinia'
import {
  Document,
  Table,
  TableCell,
  TableRow,
  Packer,
  Paragraph,
  WidthType,
  TableLayoutType,
  BorderStyle,
  TextRun,
  Header,
  ImageRun,
  AlignmentType,
  HeightRule,
} from 'docx'
import { saveAs } from 'file-saver'

export const exportWordStore = defineStore('exportWord', () => {
  const url =
    'https://media.istockphoto.com/id/592031250/zh/%E7%85%A7%E7%89%87/milky-way-and-pink-light-at-mountains-night-colorful-landscape.jpg?s=612x612&w=0&k=20&c=XjvBw-fCG-ZVlOe1L7OMmw0vT66twMnKr9O2CbPch04='
  //table test data
  const ExportData = ref([
    {
      title: '圖片1',
      content: {
        name: '貴陽大樓新建工程',
        date: '112. 11. 07.',
        main: '防水工程',
        direction: '2F防水層施作試水自檢(204)',
        design: ['設計：', '滿水試驗', '\u00A0'],
        actually: ['實際：', '開始時間:14:30', '水位高度:3.6CM'],
      },
      picture: { Url: url },
    },
    {
      title: '圖片2',
      content: {
        name: '貴陽大樓新建工程',
        date: '112. 11. 07.',
        main: '防水工程',
        direction: '2F防水層施作試水自檢(204)',
        design: ['設計：', '滿水試驗', '\u00A0', '靜置時間:48小時'],
        actually: ['實際：', '開始時間:14:30', '水位高度:3.6CM', '無滲漏'],
      },
      picture: { Url: url },
    },
    {
      title: '圖片3',
      content: {
        name: '貴陽大樓新建工程',
        date: '112. 11. 07.',
        main: '防水工程',
        direction: '2F防水層施作試水自檢(204)',
        design: ['設計：', '滿水試驗', '\u00A0', '靜置時間:48小時'],
        actually: ['實際：', '開始時間:14:30', '水位高度:3.6CM', '無滲漏'],
      },
      picture: { Url: url },
    },
    {
      title: '圖片4',
      content: {
        name: '貴陽大樓新建工程',
        date: '112. 11. 07.',
        main: '防水工程',
        direction: '2F防水層施作試水自檢(204)',
        design: ['設計：', '滿水試驗', '\u00A0', '靜置時間:48小時'],
        actually: ['實際：', '開始時間:14:30', '水位高度:3.6CM', '無滲漏'],
      },
      picture: { Url: url },
    },
    {
      title: '圖片5',
      content: {
        name: '貴陽大樓新建工程',
        date: '112. 11. 07.',
        main: '防水工程',
        direction: '2F防水層施作試水自檢(204)',
        design: ['設計：', '123'],
        actually: ['實際：', '456'],
      },
      picture: { Url: url },
    },
    {
      title: '圖片6',
      content: {
        name: '貴陽大樓新建工程',
        date: '112. 11. 07.',
        main: '防水工程',
        direction: '2F防水層施作試水自檢(204)',
        design: ['設計：', '123'],
        actually: ['實際：', '456'],
      },
      picture: { Url: url },
    },
    {
      title: '圖片7',
      content: {
        name: '貴陽大樓新建工程',
        date: '112. 11. 07.',
        main: '防水工程',
        direction: '2F防水層施作試水自檢(204)',
        design: ['設計：', '123'],
        actually: ['實際：', '456'],
      },
      picture: { Url: url },
    },
    {
      title: '圖片8',
      content: {
        name: '貴陽大樓新建工程',
        date: '112. 11. 07.',
        main: '防水工程',
        direction: '2F防水層施作試水自檢(204)',
        design: ['設計：', '123'],
        actually: ['實際：', '456'],
      },
      picture: { Url: url },
    },
    {
      title: '圖片9',
      content: {
        name: '貴陽大樓新建工程',
        date: '112. 11. 07.',
        main: '防水工程',
        direction: '2F防水層施作試水自檢(204)',
        design: ['設計：', '123'],
        actually: ['實際：', '456'],
      },
      picture: { Url: url },
    },
    {
      title: '圖片10',
      content: {
        name: '貴陽大樓新建工程',
        date: '112. 11. 07.',
        main: '防水工程',
        direction: '2F防水層施作試水自檢(204)',
        design: ['設計：', '123'],
        actually: ['實際：', '456'],
      },
      picture: { Url: url },
    },
    {
      title: '圖片11',
      content: {
        name: '貴陽大樓新建工程',
        date: '112. 11. 07.',
        main: '防水工程',
        direction: '2F防水層施作試水自檢(204)',
        design: ['設計：', '123'],
        actually: ['實際：', '456'],
      },
      picture: { Url: url },
    },
  ])
  const GetData = (arr) => {
    ExportData.value = arr
  }
  // async function createImage(src) {
  //   const blob = await fetch(src).then((res) => res.blob())
  //   return blob
  // }
  async function createImage(src) {
    // 假設 src 是一個跨域的圖像 URL，創建一個 Image 元素並加載圖像
    const img = new Image()
    img.crossOrigin = 'anonymous' // 設置跨域屬性
    img.src = src.Url

    // 等待圖像加載完成
    await new Promise((resolve) => {
      img.onload = resolve
    })

    const content = '112. 11. 07.'
    const canvas = document.createElement('canvas')
    canvas.width = img.width
    canvas.height = img.height

    const ctx = canvas.getContext('2d')
    ctx.drawImage(img, 0, 0, img.width, img.height)

    ctx.textAlign = 'left'
    ctx.textBaseline = 'top'
    ctx.font = '28px 標楷體'
    ctx.fillStyle = 'rgba(255, 255, 255, 1)'

    ctx.fillText(content, img.width - content.split('').length * 15, img.height - 40, img.width)

    const blob = await new Promise((resolve) => {
      canvas.toBlob(resolve)
    })

    return blob
  }

  // async function getImage(src) {
  //   return new Promise((resolve, reject) => {
  //     const image = new Image()
  //     image.onload = () => resolve({ width: image.width, height: image.height })
  //     image.onerror = reject
  //     image.src = src
  //   })
  // }
  //設置table字體樣式
  const TableStyle = async (text, isContent) => {
    let cellChildren = []
    switch (isContent) {
      case 'title': {
        cellChildren = [
          new Paragraph({
            children: [
              new TextRun({
                text: text,
                bold: true,
                font: '標楷體',
                size: 24,
              }),
            ],
          }),
        ]
        break
      }
      case 'picture': {
        // const size = await getImage(url)
        cellChildren = [
          new Paragraph({
            children: [
              new ImageRun({
                data: createImage(text),
                transformation: {
                  width: 360,
                  height: 245,
                },
              }),
            ],
            alignment: AlignmentType.CENTER,
            spacing: {
              before: 15,
            },
          }),
        ]
        break
      }
      case 'content': {
        let design_tablecell = {
          children: [],
          borders: {
            top: { style: BorderStyle.NONE, size: 3 },
            bottom: { style: BorderStyle.NONE, size: 3 },
            left: { style: BorderStyle.NONE, size: 3 },
            right: { style: BorderStyle.NONE, size: 3 },
          },
        }
        for (let index = 0; index < text.design.length; index++) {
          const element = text.design[index]
          design_tablecell.children.push(
            new Paragraph({
              children: [
                new TextRun({
                  text: element,
                  font: '標楷體',
                  size: 24,
                }),
              ],
            }),
          )
        }
        let actually_tablecell = {
          children: [],
          borders: {
            top: { style: BorderStyle.NONE, size: 3 },
            bottom: { style: BorderStyle.NONE, size: 3 },
            left: { style: BorderStyle.NONE, size: 3 },
            right: { style: BorderStyle.NONE, size: 3 },
          },
        }
        for (let index = 0; index < text.actually.length; index++) {
          const Element = text.actually[index]
          actually_tablecell.children.push(
            new Paragraph({
              children: [
                new TextRun({
                  text: Element,
                  font: '標楷體',
                  size: 24,
                }),
              ],
            }),
          )
        }
        cellChildren = [
          new Paragraph({
            children: [
              new TextRun({
                text: `檔名：${text.name}`,
                font: '標楷體',
                size: 24,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `日期：${text.date}`,
                font: '標楷體',
                size: 24,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `主題：${text.main}`,
                font: '標楷體',
                size: 24,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `說明：${text.direction}`,
                font: '標楷體',
                size: 24,
              }),
            ],
          }),
          new Table({
            layout: TableLayoutType.FIXED,
            width: {
              size: 100,
              type: WidthType.PERCENTAGE,
            },
            alignment: AlignmentType.CENTER,
            rows: [
              new TableRow({
                children: [new TableCell(design_tablecell), new TableCell(actually_tablecell)],
                height: { value: 1350, rule: HeightRule.EXACT },
              }),
            ],
          }),
        ]
        break
      }
      case 'space': {
        cellChildren = [
          new Paragraph({
            children: [
              new TextRun({
                text: '\u00A0',
                bold: true,
                font: '標楷體',
                size: 24,
              }),
            ],
          }),
        ]
        break
      }
    }
    return cellChildren
  }
  //包裝成docx table格式
  const createTableCell = async (text, isContent) => {
    return new TableCell({
      children: await TableStyle(text, isContent),
      borders: {
        top: { style: BorderStyle.DOUBLE, size: 3 },
        bottom: { style: BorderStyle.DOUBLE, size: 3 },
        left: { style: BorderStyle.DOUBLE, size: 3 },
        right: { style: BorderStyle.DOUBLE, size: 3 },
      },
    })
  }
  //生成table
  const generate = async () => {
    let table = null
    let sections = []
    let Item = {
      layout: TableLayoutType.FIXED,
      width: {
        size: 125,
        type: WidthType.PERCENTAGE,
      },
      rows: [],
      alignment: AlignmentType.CENTER,
    }

    const table_item = () => {
      table = new Table(Item)
      let sections_item = {
        headers: {
          default: new Header({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: '貴陽大樓新建工程',
                    font: '標楷體',
                    size: 32,
                  }),
                ],
                alignment: AlignmentType.CENTER,
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: '應州工程有限公司',
                    font: '標楷體',
                    size: 32,
                  }),
                ],
                alignment: AlignmentType.CENTER,
              }),
            ],
          }),
        },
        properties: {},
        children: [table],
      }
      sections.push(sections_item)
      Item.rows = []
    }

    for (let index = 0; index < ExportData.value.length; index += 2) {
      const element = ExportData.value[index]
      const Element = ExportData.value[index + 1]

      const addRow = (cells) => {
        Item.rows.push(new TableRow({ children: cells }))
      }

      if (index == ExportData.value.length - 1) {
        addRow([
          await createTableCell(element.title, 'title'),
          await createTableCell('\u00A0', 'space'),
        ])

        addRow([
          await createTableCell(element.picture, 'picture'),
          await createTableCell('\u00A0', 'space'),
        ])

        addRow([
          await createTableCell(element.content, 'content'),
          await createTableCell('\u00A0', 'space'),
        ])
      } else {
        addRow([
          await createTableCell(element.title, 'title'),
          await createTableCell(Element.title, 'title'),
        ])

        addRow([
          await createTableCell(element.picture, 'picture'),
          await createTableCell(Element.picture, 'picture'),
        ])

        addRow([
          await createTableCell(element.content, 'content'),
          await createTableCell(Element.content, 'content'),
        ])
      }

      if (Item.rows.length === 6) {
        table_item()
      }
    }

    if (Item.rows.length === 3) {
      table_item()
    }

    const doc = new Document({ sections })

    Packer.toBlob(doc).then((blob) => {
      saveAs(blob, 'example.docx')
    })
  }

  return { ExportData, generate, GetData }
})
