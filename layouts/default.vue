<template>
  <div id="root">
    <header>
      <div class="blog-name">
        <NuxtLink to="/"><h1>CLAN UNI</h1></NuxtLink>
      </div>
    </header>
    <a-row class="main" :gutter="16">
      <a-col :xs="24" :lg="18">
        <Nuxt />
      </a-col>
      <a-col :xs="24" :lg="6">
        <a-affix :offset-top="16">
          <categories />
        </a-affix>
      </a-col>
    </a-row>
  </div>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,500;1,300&display=swap');

body {
  background-color: #efeff3;
  margin: 0;
  font-family: 'Roboto', sans-serif;
  font-weight: 300;
  font-size: 100%;
  #root {
    overflow: hidden;

    header {
      background: #ff4444;
      height: 200px;
      border-top: 20px solid #cc0000;

      .blog-name {
        max-width: 760px;
        margin: 38px auto 0 auto;

        h1 {
          font-size: 48px;
          color: #fff;
          font-weight: 400;
        }
      }
    }

    .main {
      margin-top: -40px;
      @media (min-width: 1200px) {
        /* lg and higher */
        padding-right: 32px;
        padding-left: 32px;
      }

      .blog-post,
      .breadcrumbs,
      .menu {
        margin-bottom: 20px;
      }

      .menu {
        border-radius: 8px;
        overflow: clip;
        min-height: 48.5px;
      }

      .card {
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.03),
          0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02);
        border-radius: 8px;

        .card-cover {
          border-radius: 8px 8px 0 0;
        }

        ::v-deep {
          .ant-card-actions {
            border-radius: 0 0 8px 8px;

            > :first-child {
              border-radius: 0 0 0 8px;
            }

            > :last-child {
              border-radius: 0 0 8px 0;
            }
          }
        }
      }
    }
  }
}
</style>
