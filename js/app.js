const $$ = document.querySelector.bind(document)
const $$$ = document.querySelectorAll.bind(document)

// Slider DOM Element
const sliderBackground = $$('.slider-background img')
const sliderInfoHeading = $$('.slider-background__info-heading')
const sliderNameEnlish = $$('.slider-background__info-name')
const sliderProgress = $$('.slider-background__info-box-progress')
const sliderQualify = $$('.slider-background__info-box-qualify')
const sliderYear = $$('.slider-background__info-box-year')
const sliderNation = $$('.slider-background__info-box-nation')
const sliderPagination = $$('.slider-pagination')
let sliderPaginationPresentation = $$('.slider-pagination__presentation')

const slideShow = {
    currentIndex : 0,
    dataFilm:[
        {
            name:'Hợp Đồng Tình Yêu',
            english_name:'Love in Contract',
            pathUrl:'https://ophim.cc/_next/image?url=https%3A%2F%2Fimg.ophim.cc%2Fuploads%2Fmovies%2Flove-in-contract-poster.jpg&w=684&q=100',
            nation:'Hàn Quốc',
            year:2022,
            qualify:'HD',
            progress:'Tập 2'
        },
        {
            name:'Webtoon Đời Tôi',
            english_name:"Today's Webtoon",
            pathUrl:'https://ophim.cc/_next/image?url=https%3A%2F%2Fimg.ophim.cc%2Fuploads%2Fmovies%2Fwebtoon-doi-toi-poster.jpg&w=684&q=100',
            nation:'Hàn Quốc',
            year:2022,
            qualify:'HD',
            progress:'Hoàn tất(16/16)'
        },
        {
            name:'Khu Rừng Nhỏ Của Hai Người',
            english_name:'A Romance of the Little Forest',
            pathUrl:'https://ophim.cc/_next/image?url=https%3A%2F%2Fimg.ophim.cc%2Fuploads%2Fmovies%2Fkhu-rung-nho-cua-hai-nguoi-poster.jpg&w=684&q=100',
            nation:'Trung Quốc',
            year:2022,
            qualify:'HD',
            progress:'Tập 11'
        },
        {
            name:'Đảo Hải Tặc',
            english_name:'One Piece',
            pathUrl:'https://ophim.cc/_next/image?url=https%3A%2F%2Fimg.ophim.cc%2Fuploads%2Fmovies%2Fone-piece-thumb.jpg&w=684&q=100',
            nation:'Nhật Bản',
            year:2022,
            qualify:'HD',
            progress:'Hoàn tất'
        },
        {
            name:'Luật Sư 1000 Won',
            english_name:'One Dollar Lawyer',
            pathUrl:'https://ophim.cc/_next/image?url=https%3A%2F%2Fimg.ophim.cc%2Fuploads%2Fmovies%2Fluat-su-1000-won-poster.jpg&w=684&q=100',
            nation:'Hàn Quốc',
            year:2022,
            qualify:'HD',
            progress:'Tập 2'
        }
    ],
    defineProperties : function () {
        Object.defineProperty(this,'currentFilm',{
            get : function () {
                return this.dataFilm[this.currentIndex]
            }
        })
    },
    loadCurrentFilm : function () {
        sliderBackground.src = this.currentFilm.pathUrl
        sliderInfoHeading.innerText = this.currentFilm.name
        sliderNameEnlish.innerText = this.currentFilm.english_name
        sliderProgress.innerText = this.currentFilm.progress
        sliderQualify.innerText = this.currentFilm.qualify
        sliderYear.innerText = this.currentFilm.year
        sliderNation.innerText = this.currentFilm.nation
    },
    autoLoadCurrentFilm : function () {
        const _this = this;
        setInterval(() => {
            if(_this.currentIndex === 4) {
                _this.currentIndex = -1;
            }
            _this.currentIndex ++;
            _this.loadCurrentFilm();
            _this.renderSelectionActive();
        }, 4000);
    },
    renderSelection : function () {
        let countFilm = this.dataFilm.length
        let html = ''
        for (let i = 0; i < countFilm; i++) {
            html+= `<li class="slider-pagination__presentation" data-index=${i}><i class="fa-sharp fa-solid fa-circle"></i></i></li>`
            sliderPagination.innerHTML = html
        }
        // ghi đè lại DOM Element
        sliderPaginationPresentation = $$$('.slider-pagination__presentation')
        
    },
    renderSelectionActive : function () {
        let countFilm = this.dataFilm.length
        // active bài hát hiện tại
        for (let i = 0; i < countFilm; i++) {
            if (sliderPaginationPresentation[i].dataset.index === this.currentIndex.toString()) {
                sliderPaginationPresentation[i].classList.add('active')
            }
            else {
                sliderPaginationPresentation[i].classList.remove('active')
            }
        }
    },
    handleEvent : function () {
        const _this = this;
        Array.from(sliderPaginationPresentation).forEach(PaginationCurrent => {
            PaginationCurrent.onclick = function () {
                _this.currentIndex = Math.floor(this.dataset.index)
                _this.loadCurrentFilm()
                _this.renderSelectionActive();
            }
        }) ;
    },
    start : function () {
        this.defineProperties();
        this.loadCurrentFilm();
        this.autoLoadCurrentFilm();
        this.renderSelection();
        this.renderSelectionActive();
        this.handleEvent();
    }
}
slideShow.start()


// Menu navbar DOM Element
const moreBtn = $$('.nav-left__icon')
const navbarMenu = $$('.nav-bar__menu')
var navbarMenuItems = $$$('.nav-bar__menu-item')
var navbarSubMenu = $$$('.nav-bar__subMenu')
const navbarMenulist = $$('.nav-bar__menu-list')

const menuShow = {
    isMenu : false,
    dataMenu:[
        {
            label:'Thể loại',
            labelMore:['Hành Động','Tình Cảm','Hài Hước','Cổ Trang','Tâm Lý','Hình Sự','Chiến Tranh','Thể Thao','Võ Thuật','Viễn Tưởng','Kinh Dị','Gia Đình','Học Đường','Tài Liệu']

        },
        {
            label:'Quốc gia',
            labelMore:['Trung Quốc','Hàn Quốc','Nhật Bản','Thái Lan','Âu Mỹ','Đài Loan','Hồng Kông','Ấn Độ','Anh','Pháp','Canada','Ả Rập','Philipin','Quốc Gia Khác']
        },
        {
            label:'Năm phát hành',
            labelMore:['Trước 2014','Năm 2014','Năm 2015','Năm 2016','Năm 2017','Năm 2018','Năm 2019','Năm 2020','Năm 2021','Năm 2022']
        },
        {
            label:'Phim bộ'
        },
        {
            label:'Phim lẻ'
        },
        {
            label:'Phim hoạt hình'
        },
    ],
    renderMenu : function () {
        var htmls = this.dataMenu.map(function (index){
            if(typeof index.labelMore === 'object'){
                var html= `
                <li class="nav-bar__menu-item">
                <a href="#" class="nav-bar__menu-item-link">${index.label}</a>
                <i class="nav-bar__menu-item-icon fa-solid fa-chevron-right"></i>
                <ul class="nav-bar__subMenu">
                `
                for (let i = 0; i < index.labelMore.length; i++) {
                    html+=`
                        <li class="nav-bar__subMenu-item"><a href="#" class="nav-bar__subMenu-item-link">${index.labelMore[i]}</a></li>
                    `
                }
                html += `</ul>`
                return html;
            }
            else {
                return `
                <li class="nav-bar__menu-item">
                <a href="#" class="nav-bar__menu-item-link">${index.label}</a>
                </li>
                `
            }
        })
        navbarMenulist.innerHTML = htmls.join('');
        // ghi đè lại DOM để có thể nạp các DOM vừa mới
        navbarMenuItems = $$$('.nav-bar__menu-item')
        navbarSubMenu = $$$('.nav-bar__subMenu')
    },
    handleEvent :function () {
        const _this = this
        // event click moreBtn
        moreBtn.onclick = function () {
            if(_this.isMenu) {
                navbarMenu.style.animation = 'moveRightLeft linear 0.2s'
                setTimeout(() => {
                    navbarMenu.style.display = 'none'
                }, 150);
                _this.isMenu = false
            }
            else {
                navbarMenu.style.animation = 'moveLeftRight linear 0.2s'
                navbarMenu.style.display = 'flex'
                _this.isMenu = true
            }
        }
        // event click menu
        
        var menuItemHeights = null;
        let isOnSubMenu = false;
        for (let i = 0; i < navbarMenuItems.length; i++) {
            navbarMenuItems[i].onclick = function () {
                // lấy giá trị của thẻ li : menuItem 1 lần duy nhất mà không bị ghi đè lại
                const menuItemHeight = navbarMenuItems[0].offsetHeight
                if (menuItemHeights === null) {
                    menuItemHeights = menuItemHeight;
                }
                
                // xử lý khi đóng/mở list
                if(isOnSubMenu){
                    navbarSubMenu[i].style.display = 'none'
                    navbarMenuItems[i].style.height = menuItemHeights + 'px';
                    navbarMenuItems[i].style.backgroundColor = ''
                    isOnSubMenu = false;
                }
                else {
                    navbarSubMenu[i].style.display = 'inline-flex'
                    navbarMenuItems[i].style.height = menuItemHeights + navbarSubMenu[i].offsetHeight + 'px';
                    navbarMenuItems[i].style.alignItems = 'flex-start'
                    navbarMenuItems[i].style.backgroundColor = 'var(--primary-background)'
                    isOnSubMenu = true;
                }
            }
        }
    },
    start : function () {
        this.renderMenu();
        this.handleEvent();
    }
}
menuShow.start();


// Login / Register Btn DOM Element
const loginBtn = $$('.nav-right__login-btn')
const registerBtn = $$('.nav-right__register-btn')
const modal = $$('.modal')
const modalOverlays = $$('.modal-overlays')
const loginForm = $$('.login-form')
const registerForm = $$('.register-form')

const form = {
    isLoginForm : false,
    isRegisterForm : false,
    isModal :false,
    useFunctionValidator : function () {
        Validator({
            form:'.register-form',
            formGroup:'.form-item',
            rules : [
                Validator.isRequired('input[name="fullname"]','Vui lòng nhập tên đầy đủ'),
                Validator.isRequired('input[name="email"]'),
                Validator.isRequired('input[name="password"]','Vui lòng nhập mật khẩu'),
                Validator.isLength('input[name="password"]',6),
                Validator.isRequired('input[name="passwordconfirm"]','Vui lòng nhập mật khẩu'),
                Validator.isConfirm('input[name="passwordconfirm"]','.register-form input[name="password"]')
            ],
            onSubmit : function (data) {
                console.log(data)
            }
        })
        Validator({
            form:'.login-form',
            formGroup:'.form-item',
            rules : [
                Validator.isRequired('input[name="email"]'),
                Validator.isRequired('input[name="password"]','Vui lòng nhập mật khẩu'),
                Validator.isLength('input[name="password"]',6),
            ],
            onSubmit : function (data) {
                console.log(data)
            }
        })
    },
    handleEventClick : function () {
        const _this =this;
        loginBtn.onclick = function () {
            if(!_this.isModal) {
                modal.style.display = 'block';
                _this.isModal = true;
                if(!_this.isLoginForm)
                {
                    loginForm.style.display = 'block';
                    _this.isLoginForm = true;
                }
            }
        }
        registerBtn.onclick = function () {
            if(!_this.isModal)
            {
                modal.style.display = 'block';
                _this.isModal = true;
                if(!_this.isRegisterForm) {
                    registerForm.style.display = 'block'
                    _this.isRegisterForm = true;
                }
            }
        }
        modalOverlays.onclick = function () {
            if(_this.isModal)
            {
                modal.style.display = 'none'
                // disable login form 
                loginForm.style.display = 'none';
                _this.isLoginForm = false;    
                // disable register form
                registerForm.style.display = 'none'
                _this.isRegisterForm = false;
                _this.isModal = false;
            }
        }
    },
    start : function () {
        this.handleEventClick();
        this.useFunctionValidator();
    }
}
form.start();

// Back to top page
const backToTopBtn = $$('.back-to-top')
const backToTop = {
    start : function () {
        // handle show/hide backtotopBtn
        document.onscroll = function () {
            if(window.scrollY >= 200 || document.documentElement.scrollTop >= 200)
            {
                backToTopBtn.style.display = 'block';
            }
            else {
                backToTopBtn.style.display = '';
            }
        }
        
        // event click backtotopBtn
        backToTopBtn.onclick = function () {
            console.log('h0')
            window.scroll({
                top :0,
                behavior:"smooth"
            });
        }
    }
}

backToTop.start();

// render Film 
const FilmItem = $$('.slider-film-list')

const ListCarousel = {
    handleSlickSlider : function () {
        $(document).ready(function(){
            $('.slider-film-list').slick({
                arrows:false,
                infinite:true,
                slidesToShow: 5,
                slidesToScroll:3,
                autoplay:true,
                autoplaySpeed:1000,	
              });
        });
    },
    renderHtml : function (dataFilm) {
        var html = dataFilm.map(function(index){
            return `
            <a href="#" class="slider-film-item">
                <div class="slider-film-item__img">
                    <img src="${index.pathUrlImg}" alt="img-film">
                    <div class="film-list__item-playbtn">
                        <i class="fa-solid fa-circle-play"></i>
                    </div>
                </div>
                <div class="slider-film-item__name">
                    <p class="slider-film-item__name-flim">${index.name}</p>
                </div>
            </a>
            `
        })
        FilmItem.innerHTML = html.join('')
    },
    start : function (dataFilm) {
        this.renderHtml(dataFilm)
        this.handleSlickSlider();
    }
}
const dataFilm = [
    {
        name:'Bảy viên ngọc rồng',
        pathUrlImg:'https://ophim.cc/_next/image?url=https%3A%2F%2Fimg.ophim.cc%2Fuploads%2Fmovies%2Fbay-vien-ngoc-rong-hanh-tinh-hac-am-thumb.jpg&w=192&q=75',
        progress:'Hoàn tất'
    },
    {
        name:'Sứ giả thần chết',
        pathUrlImg:'https://ophim.cc/_next/image?url=https%3A%2F%2Fimg.ophim.cc%2Fuploads%2Fmovies%2Fsu-gia-than-chet-thumb.jpg&w=192&q=75',
        progress:'Tập 33'
    },
    {
        name:'LoveLive! Siêu sao',
        pathUrlImg:'https://ophim.cc/_next/image?url=https%3A%2F%2Fimg.ophim.cc%2Fuploads%2Fmovies%2Flove-live-sieu-sao-thumb.jpg&w=192&q=75',
        progress:'Tập 1'
    },
    {
        name:'Sơn Hải Tuyệt Luân',
        pathUrlImg:'https://ophim.cc/_next/image?url=https%3A%2F%2Fimg.ophim.cc%2Fuploads%2Fmovies%2Fson-hai-tuyet-luan-thumb.jpg&w=192&q=75',
        progress:'Tập 10'
    },
    {
        name:'Cậu đúng là 1 thiên tài',
        pathUrlImg:'https://ophim.cc/_next/image?url=https%3A%2F%2Fimg.ophim.cc%2Fuploads%2Fmovies%2Fcau-dung-la-mot-thien-tai-thumb.jpg&w=192&q=75',
        progress:'Tập 36'
    },
    {
        name:'Khế ước linh hồn',
        pathUrlImg:'https://ophim.cc/_next/image?url=https%3A%2F%2Fimg.ophim.cc%2Fuploads%2Fmovies%2Fkhe-uoc-linh-hon-2-thumb.jpg&w=192&q=75',
        progress:'Tập 11'
    },
    {
        name:'Ma pháp thiếu nữ',
        pathUrlImg:'https://ophim.cc/_next/image?url=https%3A%2F%2Fimg.ophim.cc%2Fuploads%2Fmovies%2Fmagia-record-ma-phap-thieu-nu-madoka-magica-ngoai-truyen-phan-2-thumb.jpg&w=192&q=75',
        progress:'Tập 12'
    },
    {
        name:'Ái Tình Flop',
        pathUrlImg:'https://ophim.cc/_next/image?url=https%3A%2F%2Fimg.ophim.cc%2Fuploads%2Fmovies%2Fai-tinh-flops-thumb.jpg&w=192&q=75',
        progress:'Tập 1'
    },
]
ListCarousel.start(dataFilm);