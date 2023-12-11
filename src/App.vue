<template>
  <div class="data_container">
    <div class="describe_area">
      <span><label>檔名：</label><input type="text" v-model="DataContent.name" /></span>
      <span><label>日期：</label><input type="text" v-model="DataContent.date" /></span>
      <span><label>主題：</label><input type="text" v-model="DataContent.main" /></span>
      <span><label>說明：</label><input type="text" v-model="DataContent.direction" /></span>
    </div>
    <div class="design_area">
      <div v-for="(design, index) in DataContent.design" :key="index">
        <span v-if="index == 0">{{ design }}</span>
        <span v-else><input type="text" v-model="DataContent.design[index]" /></span>
      </div>
    </div>
    <div class="design_area">
      <div v-for="(actually, index) in DataContent.actually" :key="index">
        <span v-if="index == 0">{{ actually }}</span>
        <span v-else>
          <input type="text" v-model="DataContent.actually[index]" />
          <i class="bx bx-minus-circle" @click="delDesign(index)"></i>
        </span>
      </div>
      <button @click="addDesign">新增欄位</button>
    </div>
    <div>
      <button @click="GetData">export</button
      ><button @click="ExportWord.generate">Generate Document</button>
    </div>
  </div>
  <div class="picture_container">
    <div class="picture_upload" v-for="(picture, index) in DataPicture" :key="index">
      <img :src="picture.Url" />
      <div class="picture_icon">
        <span><i class="bx bx-trash"></i></span>
        <span><i class="bx bx-zoom-in"></i></span>
      </div>
    </div>
    <div class="picture_upload" @click="UploadPhoto">
      <span>點擊or拖曳上傳<br />僅支援.jpg, .jpeg, .png圖檔</span>
      <input
        type="file"
        ref="inputImage"
        accept=".jpg, .jpeg, .png"
        multiple
        @change="handleDrop($event.target.files)"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { exportWordStore } from '@/stores/exportWord.js'

const ExportWord = exportWordStore()
const inputImage = ref(null)
const DataContent = ref({
  name: '貴陽大樓新建工程',
  date: '112. 11. 07.',
  main: '防水工程',
  direction: '2F防水層施作試水自檢(204)',
  design: ['設計：', '滿水試驗', '\u00A0'],
  actually: ['實際：', '開始時間:14:30', '水位高度:3.6CM'],
})
const DataPicture = ref([])
const ExportData = ref([])

const addDesign = () => {
  DataContent.value.design.push('\u00A0')
  DataContent.value.actually.push('')
}

const delDesign = (index) => {
  DataContent.value.design.splice(index, 1)
  DataContent.value.actually.splice(index, 1)
}

//觸發上傳圖片
const UploadPhoto = () => {
  inputImage.value.click()
}

//抓取圖片資訊
const handleDrop = (image) => {
  for (let index = 0; index < image.length; index++) {
    const Image = image[index]
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
        DataPicture.value.push(photo_item)
      }
    } else {
      alert('不支援的檔案格式！上傳僅支援.jpg, .jpeg, .png圖檔')
    }
  }
  inputImage.value = null
}

const GetData = () => {
  for (let index = 0; index < DataPicture.value.length; index++) {
    const element = DataPicture.value[index]
    let export_item = {
      title: `圖${index + 1}`,
      content: {
        name: DataContent.value.name,
        date: DataContent.value.date,
        main: DataContent.value.main,
        direction: DataContent.value.direction,
        design: DataContent.value.design,
        actually: DataContent.value.actually,
      },
      picture: {
        name: element.name,
        type: element.type,
        size: element.size,
        Date: element.Date,
        Url: element.Url,
      },
    }
    ExportData.value.push(export_item)
  }
  console.log(ExportData.value)
  ExportWord.GetData(ExportData.value)
}
</script>

<style scoped>
.data_container {
  width: 100%;
  padding: 0.5rem;
  display: grid;
  grid-template-columns: 25% 15% 15% 10%;
  justify-content: start;
  align-items: start;
}
.describe_area {
  display: flex;
  flex-direction: column;
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
  padding-left: 1rem;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}
.design_area div span {
  display: flex;
  align-items: center;
  padding-bottom: 0.5rem;
  color: #000000;
  font-size: 14px;
  font-weight: 600;
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
.picture_container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  padding: 0.5rem;
}
.picture_upload {
  height: 25vh;
  width: 20vw;
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
  margin-left: 0.8rem;
  position: relative;
}
.picture_upload input {
  display: none;
}
.picture_upload img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  margin: auto;
  display: block;
}
.picture_upload:hover .picture_icon {
  height: 24vh;
  width: 19vw;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: absolute;
  background-color: rgba(255, 255, 255, 0.7);
  color: white;
}
.picture_upload .picture_icon span i {
  display: none;
}
.picture_upload:hover .picture_icon span i {
  display: block;
  color: red;
  font-size: 1.8rem;
  font-weight: 500;
  cursor: pointer;
  padding: 0.5rem;
  transition: opacity 0.8s;
}
.picture_upload:hover .picture_icon span:last-child i {
  display: block;
  color: rgb(0, 60, 255);
  font-size: 1.8rem;
  font-weight: 500;
  cursor: pointer;
  padding: 0.5rem;
  transition: opacity 0.8s;
}
</style>
