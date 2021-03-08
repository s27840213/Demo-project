
# 如何執行此專案?
* 首先使用npm install安裝專案所需套件
```
 npm install
```
* 再來便可使用npm run serve來執行專案
```
npm run serve
```
# 專案架構 & 邏輯
```
├── src
    ├── apis -- axios setting, and API methods
    ├── assets -- scss file
    ├── components -- Vue Single File Components
    ├── router
        └── index.js -- Vue-router設定檔
    ├── store -- Vuex設定檔
    ├── utils -- 通用元件
    └── views -- 各vue-router的view components
    ├── App.vue -- Vue主組件
    └── main.js -- 網站進入點
└── dist -- output directory generated from command "npm run build"
```
## 程式邏輯
### 預設網址替換
* 開啟網頁時，由於專案預設網頁要求網址是/books，所以首先用vue-router的replace功能將預設網址替換。
### 切換路由時，書本陳列處不能消失
* 由於書本陳列的地方不會因為route的切換而消失，所以不將他包在View Components內，我是直接把他放在App.vue上，而每個book card都是一個router-link，點擊時會透過動態路由的方式跳轉到相對應id的book detail page。
### Book Detail相關邏輯
* Book Detail基本上就是處理各個button的互動邏輯，加減數值，及更新data等等。

### 滾輪切換展示中的書本
* 主要就是監聽滾輪，透過deltaY數值的變化，決定改變的方向。並計算總共有幾頁能切換，並用一些邏輯達到能夠無限Loop。
### 手機支援左滑右滑切換
* 主要是想不到用Vue的核心該怎麼去實現，而且手機上也沒滾輪，所以就自己寫了一個Class TouchHandler來實現左滑右滑的切換。
* 核心邏輯就是監聽touchstart跟touchend來取得滑動開始及結束的位置，並計算出是往哪一個方向，若deltaY > deltaX，則是上下滑動，不進行任何事件處理，反之，則是左滑右滑，會進行書本展示的切換。
* 此外，為了處理滑動也用EventEmitter來監聽自定義的swipe event，來藉此達成想要的效果。

### 動畫邏輯
* 用GSAP建立基本Timeline給書本，有需要時再透過restart()來重複在利用。
# 第三方套件
* **HTML Preprocessor:** 
    * **Pug**: 一種HTML的模板語言，可以用簡潔的語法來撰寫HTML，可以省略start tag與end tag，也支援使用Javasrcipt語法來寫些特殊的結構(但我不常用)。個人習慣不省略start tag來維持可讀性。
* **CSS Preprocessor**: 
    * **SCSS**: CSS知名的前處理工具，支援多項實用語法及功能，如CSS variable, mixin, nesting structure等等，可以大幅提升撰寫程式的效率，並同時擁有極高的可讀性。
*  **Frontend Framework:** Vue, Vuex, Vue-router, Vue-CLI
    *  **Vue:** 前端三大套件之一，核心專注於View層的漸進式框架，可以依照專案需求來加載其生態的工具，如做前端路由的Vue-router，狀態管理的Vuex，用來建置專案及打包的Vue-CLI，還有做server-side rendering的NUXT等等，且目前生態已非常穩定，有廣大的活躍社群使用及維護。
*  **Build Tool:** Vue-CLI
*  **3rd Party Libraries:**: 
    *  **GSAP:** 輕量級Javascript動畫套件，核心機制是透過動態修改inline css來進行動畫。提供多項實用功能如ScrollTrigger、提供類似AE Timeline的效果。

# 遇到的困難點
## 拿取api資料後，v-for渲染的時機
* 由於書本資料得一開始透過API來獲得，再透過v-for渲染，有可能不會在mounted階段就能抓到資料，所以我在透過GSAP想要用querySelector抓取book-card class時有時候會抓不到。
* 解決方式為在updated hook中看querySelector抓到的book-card class是不是為null，當不是時就將GSAP的動畫設定上去。

## Swipe監聽
* 想不到該怎麼用Vue核心來達成，最後透過自定義的Class TouchHandler來解決問題
