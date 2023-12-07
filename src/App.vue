<template>
  <div class="container">
    <div class="record_item" v-for="(item, index) in ExportData" :key="index">
      <div class="picture_area" @click="UploadPhoto(index)">
        <div class="work">
          <img :src="item.picture.Url" />
          <div class="picture_icon" v-if="item.picture.Url">
            <span><i class="bx bx-trash"></i></span>
            <span @click="openImg(item.picture.Url)"><i class="bx bx-zoom-in"></i></span>
          </div>
          <span v-else>點擊or拖曳上傳<br />僅支援.jpg, .jpeg, .png圖檔</span>
          <input
            :data-id="index"
            type="file"
            ref="inputImage"
            accept=".jpg, .jpeg, .png"
            multiple
            @change="handleDrop($event.target.files)"
          />
        </div>
      </div>
      <div class="describe_area">
        <span>{{ item.title }}</span>
        <span>檔名：{{ item.content.name }}</span>
        <span><label>日期：</label><input type="text" v-model="item.content.date" /></span>
        <span><label>主題：</label><input type="text" v-model="item.content.main" /></span>
        <span><label>說明：</label><input type="text" v-model="item.content.direction" /></span>
      </div>
      <div class="design_area">
        <div v-for="(design, index) in item.content.design" :key="index">
          <span v-if="index == 0">{{ design }}</span>
          <span v-else><input type="text" v-model="item.content.design[index]" /></span>
        </div>
      </div>
      <div class="design_area">
        <div v-for="(actually, index) in item.content.actually" :key="index">
          <span v-if="index == 0">{{ actually }}</span>
          <span v-else>
            <input type="text" v-model="item.content.actually[index]" />
            <i class="bx bx-minus-circle" @click="delDesign(item.content, index)"></i>
          </span>
        </div>
        <button @click="addDesign(index)">新增欄位</button>
      </div>
      <div class="add_area">
        <span @click="addItem"><i class="bx bx-plus-circle"></i></span>
        <span @click="deleteItem(index)" v-show="ExportData.length > 1"
          ><i class="bx bx-trash"></i
        ></span>
        <span @click="viewArr"><i class="bx bx-pencil"></i></span>
      </div>
    </div>
    <button @click="ExportWord.generate">Generate Document</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { exportWordStore } from '@/stores/exportWord.js'

const ExportWord = exportWordStore()
const inputImage = ref([])
const NowIndex = ref(null)

//table test data
const ExportData = ref([
  {
    title: '圖1',
    content: {
      name: '貴陽大樓新建工程',
      date: '112. 11. 07.',
      main: '防水工程',
      direction: '2F防水層施作試水自檢(204)',
      design: ['設計：', '滿水試驗', '\u00A0'],
      actually: ['實際：', '開始時間:14:30', '水位高度:3.6CM'],
    },
    picture: {},
  },
])
//新增自檢項目
const addItem = () => {
  let Item = {
    title: `圖${ExportData.value.length + 1}`,
    content: {
      name: '貴陽大樓新建工程',
      date: '112. 11. 07.',
      main: '防水工程',
      direction: '2F防水層施作試水自檢(204)',
      design: ['設計：', '滿水試驗', '\u00A0'],
      actually: ['實際：', '開始時間:14:30', '水位高度:3.6CM'],
    },
    picture: {},
  }
  ExportData.value.push(Item)
}

//刪除自檢項目
const deleteItem = (index) => {
  ExportData.value.splice(index, 1)

  ExportData.value.forEach((item, index) => (item.title = `圖${index + 1}`))
}

const viewArr = () => {
  console.log(ExportData.value)
  ExportWord.GetData(ExportData.value)
}

const addDesign = (index) => {
  ExportData.value[index].content.design.push('\u00A0')
  ExportData.value[index].content.actually.push('')
}

const delDesign = (arr, index) => {
  arr.design.splice(index, 1)
  arr.actually.splice(index, 1)
}

//觸發上傳圖片
const UploadPhoto = (index) => {
  if (ExportData.value[index].picture.Url) {
    return
  } else {
    NowIndex.value = index
    console.log(inputImage.value, index)
    inputImage.value[index].click()
  }
}

//抓取圖片資訊
const handleDrop = (image) => {
  const Image = image[0]
  console.log(Image)
  if (Image.type === 'image/jpeg' || Image.type === 'image/png') {
    const reader = new FileReader()
    reader.readAsDataURL(Image)
    reader.onload = () => {
      let photo_item = {
        name: Image.name,
        type: Image.type,
        size: Image.size,
        Date: Image.lastModifiedDate,
        Url: reader.result,
      }
      console.log(photo_item)
      ExportData.value[NowIndex.value].picture = photo_item
    }
  } else {
    alert('不支援的檔案格式！上傳僅支援.jpg, .jpeg, .png圖檔')
  }
}

//臨時網頁url查看圖片
const openImg = async (src) => {
  if (!src.includes('http')) src = URL.createObjectURL(await (await fetch(src)).blob())
  window.open(src)
}
</script>

<style scoped>
.container {
  height: 100%;
  width: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.record_item {
  border: 2px solid rgb(0, 0, 0);
  border-radius: 8px;
  padding: 1%;
  margin-bottom: 0.5rem;
  height: 35%;
  width: 100%;
  display: grid;
  grid-template-columns: 30% 26% 14% 20% 10%;
}
.picture_area {
  height: 100%;
  width: 100%;
  background-color: #ffffff;
  color: black;
  border-style: dotted;
  border-color: rgba(0, 0, 0, 0.5);
  border-width: 4px;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.picture_area input {
  display: none;
}
.picture_area img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  margin: auto;
  display: block;
}
.picture_area img:not([src]) {
  opacity: 0;
}
.picture_area .work {
  position: relative;
}
.picture_area:hover .picture_icon {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: absolute;
  background-color: rgba(255, 255, 255, 0.7);
  color: white;
  top: 0;
}
.picture_area .picture_icon span i {
  display: none;
}
.picture_area:hover .picture_icon span i {
  display: block;
  color: red;
  font-size: 1.8rem;
  font-weight: 500;
  cursor: pointer;
  padding: 0.5rem;
  transition: opacity 0.8s;
}
.picture_area:hover .picture_icon span:last-child i {
  display: block;
  color: rgb(0, 60, 255);
  font-size: 1.8rem;
  font-weight: 500;
  cursor: pointer;
  padding: 0.5rem;
  transition: opacity 0.8s;
}
.describe_area {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  width: 100%;
}
.describe_area span {
  display: flex;
  align-items: center;
  padding-bottom: 0.5rem;
}
.describe_area label {
  width: 80px;
  color: #000000;
  font-size: 14px;
  font-weight: 600;
}
.describe_area span input {
  width: 100%;
  outline: none;
  border: 1px solid #707070;
  font-size: 15px;
  padding: 5px 5px;
  border-radius: 5px;
  transition: all 0.3s ease;
}
.design_area {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}
.design_area div span {
  display: flex;
  align-items: center;
  padding-bottom: 0.5rem;
}
.design_area div span input {
  width: 100%;
  outline: none;
  border: 1px solid #707070;
  font-size: 15px;
  padding: 5px 5px;
  border-radius: 5px;
  transition: all 0.3s ease;
}
.design_area div span i {
  font-size: 1.5rem;
  font-weight: 500;
  cursor: pointer;
  color: #ff0000;
}
.design_area button {
  border-radius: 5px;
  border: none;
  background-color: #0b8ee6;
  font-size: 14px;
  font-weight: 600;
  padding: 5px 5px;
  color: #ffffff;
  width: 50%;
  cursor: pointer;
}
.design_area button:hover {
  border: 2px solid #0b8ee6;
  color: #0b8ee6;
  background-color: #ffffff;
}
.add_area {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}
.add_area span {
  padding: 0.8rem;
}
.add_area span i {
  font-size: 1.5rem;
  font-weight: 500;
  cursor: pointer;
}
</style>
