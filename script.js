// Get Photos from Instagram using JavaScript API: https://rudrastyh.com/javascript/get-photos-from-instagram.html

// Instagram feed
var token = '177991312.fcec6e3.b0c7a8d4769049859cdaf9ffa06785e0',
    username = 'anhtice',
    num_photos = 24,
    slickAnimClass = 'slick-animate',
    $carousel = $('.carousel'),
    $blockFeed = $('#instagram-feed'),
    carouselSettings, item, sides, image, imgSource, imgAlt;

$carousel.hide();

// Carousel created with slick.js
carouselSettings = {
  arrows: true,
  autoplay: true,
  autoplaySpeed: 3000,
  centerMode: true,
  infinite: true,
  pauseOnHover: false,
  slidesToShow: 5,
  slidesToScroll: 1,
  speed: 800,
  responsive: [
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
      }
    }
  ]
};

$.ajax({
  url: 'https://api.instagram.com/v1/users/search',
  dataType: 'jsonp',
  type: 'GET',
  data: {
    access_token: token,
    q: username,
  },
  success: function(data) {
    $.ajax({
      url: 'https://api.instagram.com/v1/users/' + data.data[0].id + '/media/recent',
      dataType: 'jsonp',
      type: 'GET',
      data: {access_token: token, count: num_photos},
      success: function(data2){
        for(item in data2.data) {
          // console.log(data2);
          imgSource = data2.data[item].images.standard_resolution.url;
          imgAlt = '';
          image = '<img src="' + imgSource + '" />';
          item = '<div class="item">' + image + '</div>';
          $blockFeed.append(item);
        }

        $(document).ready(function() {
          $carousel
            .slick(carouselSettings)
            .fadeIn(800);
        });

      }
    });
  }
});

// Carousel events to fix jump when looped
$carousel.on('init', function() {
  $('.slick-current').addClass(slickAnimClass);
}).on('beforeChange', function() {
  $(".item").removeClass(slickAnimClass);
}).on('afterChange', function() {
  $('.slick-current').addClass(slickAnimClass);
});
