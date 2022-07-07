// ハンバーガーメニュー
window.onload = function () {
  let nav = document.getElementById("header");
  let hamburger = document.getElementById("js-hamburger");
  let blackBg = document.getElementById("js-black-bg");

  hamburger.addEventListener("click", function () {
    nav.classList.toggle("open");
  });
  blackBg.addEventListener("click", function () {
    nav.classList.remove("open");
  });
};

$(function () {
  let list = "";
  const limit = 20; //表示件数
  const accessToken =
    "EAAFb7ect83EBAJkGGscHLVbzd7fSZC6xwkT7vGob7fSZBOaDqZAVpPrV54ErVx07GV7YHcNjL4FPLtbRL13ZBIS1CDS5hY1OK0wmlZC0ZCaRdScKS0tmsBlZAb9ctIZAJjZCRYNPrUDsXwQB6Q05SK0tKX1eh9nQV23X32dDRqESopgZDZD"; // アクセストークン
  const businessID = "17841454230821732"; //instagram_business_accountのID
  const url = `https://graph.facebook.com/v10.0/${businessID}?fields=name,media.limit(${limit}){caption,media_url,thumbnail_url,permalink,like_count,comments_count,media_type}&access_token=${accessToken}`;
  $.ajax({
    url: url,
  })
    .done((res) => {
      const data = res.media;
      $.each(data, function (index, val) {
        $.each(val, function (i, item) {
          console.log(item);
          if (item.media_url) {
            //メディアのタイプがビデオの場合、サムネを取得
            media =
              item.media_type == "VIDEO" ? item.thumbnail_url : item.media_url;

            // 一覧を変数listに格納
            list += `<li class="insta_item">
            <a href="${item.permalink}" target="_blank" rel="noopener">
            <img src="${media}">
          </li>`;
          }
        });
      });
      $("#insta").html(`<ul class="insta_feeds">${list}</ul>`);
    })
    .fail(function (jqXHR, status) {
      $("#insta").html("<p>読み込みに失敗しました。</p>");
    });
});

//スムーススクロール
$(function () {
  $('a[href^="#"]').click(function () {
    let speed = 500;
    let href = $(this).attr("href");
    let target = $(href == "#" || href == "" ? "html" : href);
    let position = target.offset().top;
    $("html, body").animate({ scrollTop: position }, speed, "swing");
    return false;
  });
});
