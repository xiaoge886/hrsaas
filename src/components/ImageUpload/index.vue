<template>
  <div>
    <!-- action一个#就不会报错了 -->
    <el-upload
      list-type="picture-card"
      :limit="1"
      action="#"
      :on-preview="preview"
      :on-remove="handleRemove"
      :on-change="changeFile"
      :file-list="fileList"
      :before-upload="beforeUpload"
      :class="{ disabled : fileComputed}"
      :http-request="upload"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <el-progress v-if="showPercent" :percentage="percent" style="width:180px" />
    <el-dialog :visible.sync="showDialog">
      <img :src="imgUrl" alt="" style="width:100%">
    </el-dialog>
  </div>
</template>

<script>
import COS from 'cos-js-sdk-v5'
// 实例化cos对象
const cos = new COS({
  SecretId: 'AKIDBKNNDvUuGUYQ5wZwBF8nKgx5ax93Vmsl', // 身份是吧id
  SecretKey: 'hARabScDg2GLECD4lFVWq4axPlxxtjSE' // 身份秘钥
})
export default {
  data() {
    return {
      fileList: [],
      showDialog: false,
      imgUrl: '',
      currentFileUid: null, // 记录正在上传的uid
      percent: 0, // 记录当前的百分比
      showPercent: false
    }
  },
  computed: {
    fileComputed() {
      // 如果为true,就不该显示加号了
      return this.fileList.length === 1
    }
  },
  methods: {
    preview(file) {
      this.imgUrl = file.url
      this.showDialog = true
    },
    // file是要删除的文件
    // fileList是删除过的文件
    handleRemove(file, fileList) {
      this.fileList = this.fileList.filter(item => item.uid !== file.uid)
    },
    // 不能用push 这个钩子会执行多次
    changeFile(file, fileList) {
      this.fileList = fileList.map(item => item)
      // console.log(this.fileList)
      // 因为没有上传,第二次的数据一定是空的
      // 如果完成上传动作了 第一次进入和第二次进去的长度都应该是1 应该有数据
      // 上传成功,数据才能进来
    },
    beforeUpload(file) {
      // 先检查文件类型
      const types = ['image/jpeg', 'image/gif', 'image/bmp', 'image/png']
      if (!types.some(item => item === file.type)) {
        // 如果不存在
        this.$message.error('上传图片只能是 JPG、GIF、BMP、PNG 格式!')
        return false
      }
      // 检查文件大小
      const maxSize = 5 * 1024 * 1024
      if (maxSize < file.size) {
        this.$message.error('图片大小最大不能超过5M')
        return false
      }
      // console.log(file)
      this.currentFileUid = file.uid
      this.showPercent = true
      return true
    },
    upload(params) {
      if (params.file) {
        // 执行上传操作
        cos.putObject({
          Bucket: 'xiaogemaster-1314541331', // 存储桶名称
          Region: 'ap-chongqing', // 地域
          Key: params.file.name, // 文件名
          Body: params.file, // 要上传的文件对象
          // StorageClass: 'STANDARD' // 上传的模式类型 直接默认 标准模式即可
          onProgress: (params) => {
            this.percent = params.percent * 100
          }
        }, (err, data) => {
          // data返回数据后如何处理
          console.log(err || data)
          // data中有一个statusCode === 200 的时候说明上传成功
          if (!err && data.statusCode === 200) {
            //   此时说明文件上传成功  要获取成功的返回地址
            // fileList才能显示到上传组件上 此时我们要将fileList中的数据的url地址变成 现在上传成功的地址
            // 目前虽然是一张图片 但是请注意 我们的fileList是一个数组
            // 需要知道当前上传成功的是哪一张图片
            this.fileList = this.fileList.map(item => {
              if (item.uid === this.currentFileUid) {
                return { url: 'http://' + data.Location, upload: true }
                // upload 为true 表示这张图片已经上传完毕 这个属性要为我们后期应用的时候做标记
                // 保存  => 图片有大有小 => 上传速度有快又慢 =>要根据有没有upload这个标记来决定是否去保存
              }
              return item
            })
            // 关闭进度条重置百分比
            setTimeout(() => {
              this.showPercent = false
              this.percent = 0
            }, 1000)
          }
        })
      }
    }
  }
}
</script>

<style lang="scss">
.disabled .el-upload--picture-card{
  display: none;
}
</style>
