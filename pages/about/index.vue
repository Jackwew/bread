<template>
  <div class="about-container">
    <NuxtLayout>
      <div class="content">
        <div class="concat-box">
          <div class="concat-title">
            <span class="title-info">FEEL FREE TO FILL IN OUR</span>
            <h2>CONTACT FORM</h2>
          </div>
          <div class="concat-form">
            <Form
              ref="concatValidate"
              :model="formData"
              label-position="right"
              :label-width="100"
              :label-colon="true"
              :rules="ruleValidate"
            >
              <Row :gutter="16">
                <Col span="12">
                  <FormItem label="姓" prop="name">
                    <Input v-model="formData.name"></Input>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem label="名" prop="surname">
                    <Input v-model="formData.surname"></Input>
                  </FormItem>
                </Col>
              </Row>
              <Row :gutter="16">
                <Col span="12">
                  <FormItem label="邮箱" prop="email">
                    <Input v-model="formData.email"></Input>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem label="公司" prop="company">
                    <Input v-model="formData.company"></Input>
                  </FormItem>
                </Col>
              </Row>
              <Row :gutter="16">
                <Col span="12">
                  <FormItem label="电话/座机" prop="phone">
                    <Input v-model="formData.phone"></Input>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem label="地址:" prop="address">
                    <Input v-model="formData.address"></Input>
                  </FormItem>
                </Col>
              </Row>
              <Row :gutter="16">
                <Col span="12">
                  <FormItem label="城市" prop="city">
                    <Cascader :data="cityList" v-model="formData.city"></Cascader>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem label="国家" prop="country">
                    <Select v-model="formData.country" :clearable="true">
                      <Option v-for="item in cityList" :value="item.value" :key="item.value">
                        {{ item.label }}
                      </Option>
                    </Select>
                  </FormItem>
                </Col>
              </Row>
              <Row :gutter="16">
                <Col span="24">
                  <FormItem label="类型" prop="problem">
                    <Select v-model="formData.problem" :clearable="true">
                      <Option v-for="item in problemList" :value="item.value" :key="item.value">
                        {{ item.label }}
                      </Option>
                    </Select>
                  </FormItem>
                </Col>
              </Row>
              <Row :gutter="16">
                <Col span="24">
                  <FormItem label="留言">
                    <Input
                      class="textarea--input"
                      v-model="formData.message"
                      type="textarea"
                      :autosize="{ minRows: 10, maxRows: 12 }"
                      placeholder="请写下你要留言的内容..."
                    />
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="24" class="button">
                  <FormItem>
                    <Button type="primary" class="button-box" @click="handleSubmit">提交</Button>
                    <Button type="warning" class="button-box" @click="handleReset">重置</Button>
                  </FormItem>
                </Col>
              </Row>
            </Form>
          </div>
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>
<script setup lang="ts">
const formData = ref({
  name: '',
  surname: '',
  email: '',
  phone: '',
  company: '',
  address: '',
  city: [],
  country: '',
  problem: '',
  message: ''
})

const ruleValidate = ref({
  name: [{ required: true, message: '请输入你的姓氏', trigger: 'blur' }],
  surname: [{ required: true, message: '请输入你的名字', trigger: 'blur' }],
  email: [{ required: true, message: '请输入你的邮箱', trigger: 'blur' }],
  phone: [{ required: true, message: '请输入你的电话/座机', trigger: 'blur' }],
  address: [{ required: true, message: '请输入你的详细地址', trigger: 'blur' }],
  company: [{ required: false, message: '请输入你的公司', trigger: 'blur' }],
  city: [{ required: true, message: '请选择你的城市', trigger: 'change', type: 'array' }],
  country: [{ required: true, message: '请选择你的国家', trigger: 'change' }],
  problem: [{ required: true, message: '请选择你的问题', trigger: 'change' }]
})

const cityList = ref([
  {
    value: 'beijing',
    label: '北京',
    children: [
      {
        value: 'gugong',
        label: '故宫'
      },
      {
        value: 'tiantan',
        label: '天坛'
      },
      {
        value: 'wangfujing',
        label: '王府井'
      }
    ]
  },
  {
    value: 'jiangsu',
    label: '江苏',
    children: [
      {
        value: 'nanjing',
        label: '南京',
        children: [
          {
            value: 'fuzimiao',
            label: '夫子庙'
          }
        ]
      },
      {
        value: 'suzhou',
        label: '苏州',
        children: [
          {
            value: 'zhuozhengyuan',
            label: '拙政园'
          },
          {
            value: 'shizilin',
            label: '狮子林'
          }
        ]
      }
    ]
  }
])

const problemList = ref([
  {
    value: 'outsource',
    label: '我需要做一个网站/APP/小程序'
  },
  {
    value: 'offer',
    label: '我需要一份报价单'
  },
  {
    value: 'problem',
    label: '我想咨询一些问题'
  },
  {
    value: 'project',
    label: '我有一个项目，请与我联系'
  }
])

const handleSubmit = () => {}

const handleReset = () => {}
</script>

<style lang="scss" scoped>
.about-container {
  width: 100%;
  font-family: orpheus-pro;
  background: url('/images/contact.jpg') no-repeat;
  background-size: cover;
  .content {
    width: 100%;
    background-size: cover;
    overflow: hidden;
    .concat-box {
      max-width: 1200px;
      border-radius: 8px;
      background: #dfd8d2;
      margin: 100px auto;
      padding: 20px 40px;
      .concat-title {
        width: 100%;
        margin-top: 40px;

        span {
          display: block;
          text-align: center;
        }

        h2 {
          font-size: 60px;
          font-style: normal;
          font-weight: 200;
          text-align: center;
        }
      }
      .concat-form {
        width: 100%;
        padding: 0 40px;
        margin-top: 20px;

        .textarea--input {
          border: 1px solid #a9a9a9;
          border-bottom: none;
        }

        .button {
          display: flex;
          justify-content: center;

          .button-box {
            width: 120px;
            margin: 30px 20px;
          }
        }
      }
    }
  }
}
</style>

<style lang="scss">
.concat-form .ivu-input {
  background-color: transparent;
  border: none;
  border-bottom: 1px solid #a9a9a9;
  border-radius: inherit;
  outline: none;

  &:focus {
    box-shadow: none;
  }
}

.concat-form .ivu-select-selection {
  background-color: transparent;
  border: none;
  border-radius: inherit;
  border-bottom: 1px solid #a9a9a9;

  &:focus {
    box-shadow: none;

    border-color: transparent;
    border-bottom: 1px solid #a9a9a9;
    outline: none;
  }
}
</style>
