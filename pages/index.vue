<template>
  <div class="index-container">
    <NuxtLayout>
      <div class="home-video">
        <Video-bg />
      </div>
      <div class="smegma">
        <div class="title-box">
          <div class="title">
            Front-end Dev <br />
            & Photography Enthusiast.
          </div>
        </div>
        <div class="options">
          <div class="about-button">了解我</div>
          <div class="show-video">Watch Video</div>
        </div>
      </div>
      <section class="content-wrapper person">
        <div ref="gs_reveal" class="person-img gs_reveal_fromLeft">
          <img
            src="https://mo-easy.obs.cn-north-4.myhuaweicloud.com/www/myself_to.jpg"
            alt="travel"
          />
        </div>
        <div ref="gs_reveal" class="person-info gs_reveal_fromRight">
          <h2>My job is a front-end / full stack development</h2>
          <p>
            我目前是一名前端开发工程师, 主要工作地在四川 - 成都, 使用的技术有: <a>Html5</a>,
            <a>Css/Css3</a>, <a>Javascript</a>, <a>TypeScript</a>, <a>Nodejs</a>, <a>Java</a>。
            对于框架的研究有：<a>React</a>, <a>Vue2/3</a>, <a>webpack</a>,<a>vite</a>,
            <a>React Native</a
            >。截至目前已经在成都工作五年有余，成都是一座来了就不想离开的城市。如果你想了解更多关于和我一起工作的信息,
            或者成都这座美丽的城市, 请联系我
          </p>
          <div class="person-more" @click="getList">
            <span>LEARN MORE →</span>
          </div>
        </div>
      </section>
      <section class="content-wrapper project">
        <div class="title">
          <div class="title-letter">I LEAD THE LATEST PROJECT</div>
          <div class="title-big">看看最近工作上最新的一些React/Vue前端项目</div>
        </div>
        <div v-if="projectList.length" class="project-list">
          <div class="new-pro">
            <img :src="primaryProject?.projectImg" alt="hty" />
            <Tooltip class="icon" content="React项目" placement="right" always theme="light">
              <CustomIcon icon-content="react" color="#61dafb" :size="50" />
            </Tooltip>
            <div class="info-mess">
              <div class="title">{{ primaryProject?.projectName }}</div>
              <div class="des">{{ primaryProject?.projectDes }}</div>
            </div>
          </div>
          <div class="less-pro">
            <div v-for="pro in projectList" :key="pro.id" class="less-item">
              <img :src="pro?.projectImg" alt="global" />
              <Tooltip class="icon" content="React项目" placement="right" always theme="light">
                <CustomIcon icon-content="react" color="#61dafb" :size="32" />
              </Tooltip>
              <div class="info-mess">
                <div class="less-title">{{ pro?.projectName }}</div>
                <div class="des">{{ pro?.projectDes }}</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="content-wrapper blog">
        <div class="title">
          <div class="title-letter">LATEST BLOG POSTS</div>
          <div class="title-big">关于我做为前端开发工程师的一些想法和见解{{ foo }}</div>
        </div>
        <div class="blog-wrapper">
          <div v-for="blog in blogList" :key="blog.id" class="blog-item">
            <img :src="blog.blogImg" alt="expansions" />
            <div class="blog-title">{{ blog.blogName }}</div>
            <div class="blog-short-desc">{{ blog.shortContent }}</div>
            <NuxtLink :to="`/detail/${blog.blogId}`" class="read-more">Read More</NuxtLink>
          </div>
        </div>
      </section>
      <section class="content-wrapper life">
        <div class="letter-title">MY INSTAGRAM FEED</div>
        <div class="big-title">我的生活以及随手拍</div>
        <swiper-container
          :slides-per-view="3"
          :space-between="30"
          :free-mode="true"
          :pagination="{
            clickable: true
          }"
          :modules="modules"
        >
          <template v-for="(_photo, index) in photoList" :key="index">
            <swiper-slide class="swiper-slide">
              <img :src="_photo" alt="img" />
            </swiper-slide>
          </template>
        </swiper-container>
      </section>
    </NuxtLayout>
  </div>
</template>
<script lang="ts" setup>
import CuSwiper from 'swiper'
import { FreeMode, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/pagination'

const foo = useFoo()
const modules = ref([FreeMode, Pagination])
const projectList: any = ref([])
const blogList: any = ref([])
const primaryProject: any = ref([])
const photoList: any = ref([
  'https://mo-easy.obs.cn-north-4.myhuaweicloud.com/www/pat/20220829163714.jpg',
  'https://mo-easy.obs.cn-north-4.myhuaweicloud.com/www/pat/20220829163729.jpg',
  'https://mo-easy.obs.cn-north-4.myhuaweicloud.com/www/pat/20220829163752.jpg',
  'https://mo-easy.obs.cn-north-4.myhuaweicloud.com/www/pat/20220829163741.jpg'
])
// const colorMode = useColorMode()

const getList = async () => {
  const { list }: any = await getProjectList({ query: { pageNum: 1, pageSize: 10 } })
  primaryProject.value = list[0]
  projectList.value = list.splice(1, 4)
}

const asyncGetBlogList = async () => {
  const { list }: any = await getBlogData({ query: { pageNum: 1, pageSize: 10 } })
  blogList.value = list
}

onMounted(async () => {
  await getList()
  await asyncGetBlogList()
  if (process.client) {
    new CuSwiper('.mySwiper', {
      cssMode: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      pagination: {
        el: '.swiper-pagination'
      },
      mousewheel: true,
      keyboard: true
    })
  }
})
</script>

<style scoped lang="scss">
.index-container {
  width: 100%;
  height: 100%;
  position: relative;
  .home-video {
    width: 100%;
    min-height: 100vh;
    position: absolute;
    top: 0;
    overflow: hidden;
    z-index: -1;
  }
  .smegma {
    width: 100%;
    min-height: 100vh;
    margin-top: -100px;
    background: rgba(0, 0, 0, 0.4);
    display: flex;
    flex-direction: column;
    .title-box {
      width: 100%;
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      .title {
        font-family: orpheus-pro;
        font-style: normal;
        color: #fff;
        font-size: calc((6.4 - 1) * 1.2vw + 1rem);
        text-align: center;
        font-weight: 400;
      }
    }
    .options {
      min-height: 100px;
      color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1;

      .about-button {
        width: 204px;
        height: 65px;
        text-align: center;
        line-height: 65px;
        border: 1px solid #e1a87a;

        &:hover {
          background-color: #e1a87a;
          border-color: #e1a87a;
          color: #fff;
        }
      }

      .show-video {
        height: 65px;
        text-align: center;
        line-height: 65px;
        padding: 0 20px;
        cursor: pointer;

        &:hover {
          opacity: 0.5;
        }

        &:before {
          background-position: center;
          background-repeat: no-repeat !important;
          background-size: 64px 64px;
          content: '';
          display: inline-block;
          height: 64px;
          margin: 0 8px 0 0;
          vertical-align: middle;
          width: 64px;
          background: url('/images/show.svg');
        }
      }
    }
  }
  .empty {
    height: calc(100vh - 100px);
  }
  .content-wrapper {
    width: 100%;
    padding: 6vw 15vw 0vw;
    color: #000;
    font-family: orpheus-pro;

    .title {
      width: 100%;
      padding: 0 200px;
      font-size: 14px;

      .title-big {
        text-align: center;
        font-size: 40px;
        font-weight: 300;
      }
    }
  }

  .person {
    display: flex;

    .person-img {
      width: 30vw;
      height: 700px;

      img {
        width: 100%;
        height: 100%;
        border-radius: 8px;
      }
    }

    .person-info {
      flex: 1;
      margin-left: 100px;
      margin-top: 120px;

      h2 {
        font-size: calc((2.6 - 0.5) * 1.2vw + 1rem);
        font-weight: 200;
        font-style: normal;
        letter-spacing: 0em;
        text-transform: none;
        line-height: 1.2;
      }

      p {
        font-size: 16px;
        margin-top: 40px;
        font-family: PingFangSC-Regular, sans-serif;
        line-height: 40px;
      }

      .person-more {
        width: 200px;
        height: 63px;
        border: 2px solid #e1a87a;
        text-align: center;
        line-height: 63px;
        margin-top: 60px;
        position: relative;
        background: transparent;
        border-radius: 5px;
        cursor: pointer;

        span {
          z-index: 999;
        }

        &:after {
          content: 'LEARN MORE →';
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 0;
          z-index: -1;
          background: transparent;
          transition: all 1s cubic-bezier(0.19, 1, 0.22, 1);
          transition-timing-function: cubic-bezier(0.19, 1, 0.22, 1);
          transition-duration: 0.5s;
        }

        &:hover {
          background: transparent;

          &:after {
            z-index: 1;
            height: 100%;
            background: #e1a87a;
          }
        }
      }
    }
  }
  .project {
    .project-list {
      width: 100%;
      height: 500px;
      margin-top: 20px;
      display: flex;
      font-family: PingFangSC-Regular, sans-serif;
      color: #fff;

      .title {
        padding: 0;
        font-size: 18px;
        font-weight: 600;
      }

      .des {
        font-size: 12px;
      }

      .new-pro {
        width: 35vw;
        height: 500px;
        position: relative;
        overflow: hidden;
        cursor: pointer;

        .icon {
          position: absolute;
          top: 10px;
          left: 10px;
        }

        img {
          width: 100%;
          height: 100%;
          transition: all 2s cubic-bezier(0.19, 1, 0.22, 1);
          transition-timing-function: cubic-bezier(0.19, 1, 0.22, 1);
          transition-duration: 2s;
        }

        .info-mess {
          width: 100%;
          height: 50px;
          padding: 15px 10px;
          background: rgba(0, 0, 0, 0.4);
          position: absolute;
          bottom: 0;
          border-radius: 10px 10px 0 0;
          cursor: pointer;
          transition:
            background 1s,
            height 0.5s;

          .title {
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 10px;
          }
        }

        &:hover {
          .info-mess {
            height: 130px;
            background: rgba(0, 0, 0, 0.8);
          }
        }
      }

      .less-pro {
        width: 100%;
        flex: 1;
        display: flex;
        flex-wrap: wrap;

        .less-item {
          width: 50%;
          height: 50%;
          border: 1px solid #f5f5f5;
          position: relative;
          overflow: hidden;

          img {
            width: 100%;
            height: 100%;
            transition: all 2s cubic-bezier(0.19, 1, 0.22, 1);
            transition-timing-function: cubic-bezier(0.19, 1, 0.22, 1);
            transition-duration: 2s;
          }

          .icon {
            position: absolute;
            top: 10px;
            left: 10px;
          }

          .info-mess {
            width: 100%;
            height: 35px;
            padding: 10px 8px;
            background: rgba(0, 0, 0, 0.4);
            position: absolute;
            bottom: 0;
            border-radius: 10px 10px 0 0;
            cursor: pointer;
            transition:
              background 1s,
              height 0.5s;

            .less-title {
              font-size: 16px;
              font-weight: bold;
              margin-bottom: 5px;
            }
          }

          &:hover {
            .info-mess {
              height: 130px;
              background: rgba(0, 0, 0, 0.8);
            }
          }
        }
      }
    }
  }
  .blog .blog-wrapper {
    width: 100%;
    min-height: 500px;
    margin-top: 20px;
    display: flex;
    justify-content: space-between;

    .blog-item {
      flex: 1;
      margin-right: 15px;
      overflow: hidden;

      &:nth-last-child(1) {
        margin-right: 0;
      }

      img {
        width: 100%;
        height: 300px;
        border-radius: 8px;
      }

      .blog-title {
        height: 90px;
        padding: 15px 0;
        font-size: 24px;
        overflow: hidden;
        /*将对象作为弹性伸缩盒子模型显示*/
        display: -webkit-box;
        /*设置子元素排列方式*/
        -webkit-box-orient: vertical;
        /*设置显示的行数，多出的部分会显示为...*/
        -webkit-line-clamp: 2;
      }

      .blog-short-desc {
        width: 100%;
        height: auto;
        max-height: 90px;
        font-size: 14px;
        line-height: 30px;
        overflow: hidden;
        /*将对象作为弹性伸缩盒子模型显示*/
        display: -webkit-box;
        /*设置子元素排列方式*/
        -webkit-box-orient: vertical;
        /*设置显示的行数，多出的部分会显示为...*/
        -webkit-line-clamp: 3;
      }

      .read-more {
        margin-top: 20px;
        color: #e1a87a;
        text-decoration: underline;
        cursor: pointer;
      }
    }
  }
  .life {
    .letter-title {
      text-align: center;
    }

    .big-title {
      text-align: center;
      font-size: 40px;
      margin: 15px 0;
    }
    .swiper-slide {
      text-align: center;
      font-size: 18px;
      background: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 300px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>