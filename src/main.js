const $siteList = $(".siteList");
const $lastLi = $siteList.find("li.last");
const x = localStorage.getItem("x");
const xObject = JSON.parse(x);
const hashMap = xObject || [
  {
    logo: "G",
    imagelogo: "/github-logo.7c6733fb.png",
    url: "https://www.github.com"
  },
  {
    logo: "B",
    imagelogo: "/bilibili-logo.2ad423cb.png",
    url: "https://www.bilibili.com"
  },
  {
    logo: "X",
    imagelogo: "/xiedaimala-logo.cef6db52.png",
    url: "https://www.xiedaimala.com"
  },
  {
    logo: "I",
    imagelogo: "/iconfont-logo.3d388875.png",
    url: "https://www.iconfont.cn"
  }
];

const simplifyUrl = url => {
  return url
    .replace("https://", "")
    .replace("http://", "")
    .replace("www.", "")
    .replace(/\/.*/, ""); //删除/开头的内容
};

const render = () => {
  $siteList.find("li:not(.last)").remove();
  hashMap.forEach((node, index) => {
    const $li = $(`<li>
          <div class="site">
            <div class="logo">
              <div class="letter">${node.logo}</div>
              <img src=${node.imagelogo} alt="" class="image-logo" />
            </div>
            <div class="link">${simplifyUrl(node.url)}</div>
            <div class="close">
              <svg class="icon" >
                <use xlink:href="#icon-close"></use>
               </svg>
            </div>
          </div>
      </li>`).insertBefore($lastLi);
    $li.on("click", () => {
      window.open(node.url, "_self");
    });
    $li.on("click", ".close", e => {
      e.stopPropagation(); //阻止冒泡
      hashMap.splice(index, 1);
      render();
    });
  });
};

render();

$(".addButton").on("click", () => {
  let url = window.prompt("请问你要添加的网址是啥？");
  if (url.indexOf("http") !== 0) {
    url = "https://" + url;
  }
  console.log(url);
  hashMap.push({ logo: simplifyUrl(url)[0].toUpperCase(), url: url });
  render();
});

window.onbeforeunload = () => {
  const string = JSON.stringify(hashMap);
  localStorage.setItem("x", string);
};

$(document).on("keypress", e => {
  const { key } = e;
  for (let i = 0; i < hashMap.length; i++) {
    if (hashMap[i].logo.toLowerCase() === key) {
      window.open(hashMap[i].url);
    }
  }
});

$(document).ready(function() {
  $(".site").mouseover(function() {
    $(".site .image-logo").show();
    $(".site .letter").hide();
  });
  $(".site").mouseout(function() {
    $(".site .image-logo").hide();
    $(".site .letter").show();
  });
});
