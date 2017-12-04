!(function ($) {
    // regular js
    // jquery
    $(function () {
        //Memeber profile
        CustomFunction('member/profile.aspx');
        // bootstrap classes
        $("#dynamic-container, #content-container, #job-dynamic-container").wrap("<div class='container-fluid'></div>").addClass("row");
        $("#content-container.newDash").removeClass("container");
        if ($.trim($("#dynamic-side-left-container a:visible, #side-left a:visible, #job-side-column a:visible").text()).length) {
            $("#dynamic-side-left-container, #side-left").addClass("col-md-4 hidden-sm hidden-xs pull-right");
            $("#dynamic-content, #content-container #content").addClass("col-md-8 col-sm-12 col-xs-12 pull-left");
            $("#job-side-column").addClass("col-lg-4 hidden-md hidden-sm hidden-xs pull-left");
            $("#job-dynamic-container #content").addClass("col-lg-8 col-md-12 col-sm-12 col-xs-12 pull-right");
        } else {
            $("#dynamic-side-left-container, #side-left").hide();
            $("#dynamic-content, #content").addClass("col-xs-12");
        }
        $("#side-right, #dynamic-side-right-container").hide();
        // make header sticky.
        var headerHeight = $("#r20_header-container").height();
        $("body").addClass("r20_sticky-header");
        $("body").css("padding-top", headerHeight);
        // skip link
        $("#skip-link").attr("href", "#" + $("#dynamic-content, #content").attr("id"));
        // remove empty li's and ul's on the system pages.
        $(".links-2 li:empty").remove();
        $(".links-2 ul:empty").remove();
        // add active class to links.
        $("li a[href='" + window.location.pathname.toLowerCase() + "']").parent().addClass("active");
        $("li.active li.active").parent().closest("li.active").removeClass("active");
        // add nbsp;
        $("#side-drop-menu > li > ul > li > a").each(function () {
            var linkText = $(this).text();
            linkText = linkText.replace(" (", "&nbsp;(");
            $(this).html(linkText);
        });
        // move news rss feed to bottom of news index.
        $(".newsIndex").append($(".newsIndex .search-options"));
        // move date on new page.
        $(".news-individual-container").each(function () {
            $(this).children(".news-excerpt").children("h3").after($(this).children(".news-date"));
        });

        //Change language
        $(".language-choose ul li a").on( "click", function() {
            var linkid = $(this).attr("data-id");
            $('.languages option').attr('selected', false);
            //$('.languages option[value="' + linkid + '"]').attr('selected', 'selected');
            $('.languages select').val(linkid);
            // console.log($('.languages select').val(linkid));
            $('.languages select').trigger('change');
        }); 
        // generate actions button
        $(".job-navbtns").convertButtons({
            buttonTitle: "Actions&hellip;",
            title: "Please choose&hellip;",
            links: ".job-navbtns a"
        });
        // generate filters button
        $(".job-navbtns").convertFilters({
            buttonTitle: "Filters&hellip;",
            filteredTitle: "Applied Filters",
            title: "Please choose&hellip;",
            filtered: ".search-query p",
            list: "ul#side-drop-menu",
            excludeFromList: "#AdvancedSearchFilter_PnlCompany"
        });
        // copy header social media links to footer and contact page.
        var contactSocialMedia = $(".r20_social-media").clone()
        var footerSocialMedia = $(".r20_social-media a").clone();
        $("#r20_contact-us-social-media").prepend(contactSocialMedia);
        footerSocialMedia.children("i").remove();
        $("#r20_footer-social-media").append("<span>Follow&nbsp;Us&nbsp;on </span>");
        $("#r20_footer-social-media").append(footerSocialMedia);
        $("#r20_footer-social-media").append("<span> for&nbsp;Market&nbsp;Updates.</span>");
        // mobile menu
        $("#r20_mobile-navigation").click(function (e) {
            e.preventDefault();
            $("#header").toggleClass('menuOpened');
            $("#r20_navigation > ul").toggleClass("active");
        });
        // home banner
        $(".r20_slider").cycle({
            slides: "> div",
            pager: ".cycle-pager"
        });
        // inner banners
        // write inner banner image if it doesn't already contain an image
        if ($("#r20_inner-banner-container:visible").length && !$("#r20_inner-banner-container img").length) {
            var parentIndex;
            $("#r20_navigation a").each(function () {
                if (location.pathname.toLowerCase() == $(this).attr("href")) {
                    parentIndex = $(this).closest("#r20_navigation > ul > li").index();
                }
            });
            $("#r20_inner-banner-container").prepend($("<img src='/media/B-recruit/images/banners/inner-" + (parentIndex > -1 ? parentIndex : "0") + ".jpg' alt='B-recruit' />"));
        }

        $('.languages select option#language_7').html('简体中文');
        // Latest Jobs widget
        $(".r20_latest-jobs ul").each(function () {
            var dataURL = $(this).attr("data-url");
            $(this).includeFeed({
                baseSettings: {
                    rssURL: [dataURL || "/job/rss.aspx"]
                },
                templates: {
                    itemTemplate: "<li><div class='rss-item' id='rss-item-{{item-index}}'><span class='rss-item-title'><a target='_blank' href='{{link}}'>{{title}}</a></span><span class='rss-item-pubDate'>[[pubDateTemplate]]</span><span class='rss-item-description'>{{description}}</span><span class='rss-item-link'><a href='{{link}}' title='Read more'>Read more&nbsp;&gt;</a></span></div></li>"
                },
                complete: function () {
                    if ($(this).children().length > 2) {
                        $(this).jcarousel({
                            auto: 5,
                            scroll: 1,
                            wrap: "circular",
                            vertical: true
                        });
                    }
                }
            });
        });
        // Latest News widget
        $(".r20_latest-news ul").each(function () {
            var dataURL = $(this).attr("data-url");
            $(this).includeFeed({
                baseSettings: {
                    rssURL: [dataURL || "/NewsRSS.aspx"]
                },
                templates: {
                    itemTemplate: "<li><div class='rss-item' id='rss-item-{{item-index}}'><span class='rss-item-pubDate'>[[pubDateTemplate]]</span><span class='rss-item-title'><a target='_blank' href='{{link}}'>{{title}}</a></span><span class='rss-item-description'>{{description}}</span><span class='rss-item-link'><a href='{{link}}' title='Read more'>Read more&nbsp;&gt;</a></span></div></li>"
                },
                complete: function () {
                    if ($(this).children().length > 2) {
                        $(this).jcarousel({
                            auto: 5,
                            scroll: 1,
                            wrap: "circular",
                            vertical: true
                        });
                    }
                }
            });
        });
        // Testimonials widget
        $(".r20_testimonials ul").each(function () {
            var dataURL = $(this).attr("data-url");
            $(this).includeFeed({
                baseSettings: {
                    rssURL: [dataURL || "/NewsRSS.aspx"]
                },
                templates: {
                    itemTemplate: "<li><div class='rss-item' id='rss-item-{{item-index}}'><span class='rss-item-description'>{{description}}</span><span class='rss-item-title'><a target='_blank' href='{{link}}'>{{title}}</a></span></div></li>"
                },
                complete: function () {
                    if ($(this).children().length > 2) {
                        $(this).jcarousel({
                            auto: 5,
                            scroll: 1,
                            wrap: "circular",
                            vertical: true
                        });
                    }
                }
            });
        });

        // csr inner news and events
        $(".csr-news ul").each(function () {
            var dataURL = $(this).attr("data-url");
            $(this).includeFeed({
                baseSettings: {
                    rssURL: [dataURL || "/NewsRSS.aspx"], limit: 1
                },
                templates: {
                    itemTemplate: "<li><div class='rss-item' id='rss-item-{{item-index}}'><span class='rss-item-pubDate'>[[pubDateTemplate]]</span><span class='rss-item-title'><a target='_blank' href='{{link}}'>{{title}}</a></span><span class='rss-item-description'>{{description}}</span><span class='rss-item-link'><a href='{{link}}' title='Read more'>Read more&nbsp;&gt;</a></span></div></li>"
                },
                complete: function () {

                }
            });
        });
        //consultants
        /*$("#teammember").includeFeed({
			baseSettings: {
				rssURL: ["/consultantsrss.aspx"],
				limit: 200,
				addNBSP: false,
				repeatTag: "consultant"
			},
			templates: {
				itemTemplate: '<div class="col-md-4 col-sm-6 col-xs-12 r20_team-member">\n\
	<a href="/t/{{FriendlyURL}}" title="{{FirstName}} {{LastName}}">\n\
				<img alt="{{FirstName}} {{LastName}}" class="r20_team-member-photo" src="{ImageURL}}" />\n\
				<strong class="r20_team-member-name">{{FirstName}} {{LastName}}</strong><strong class="r20_team-member-position">{{PositionTitle}}</strong></a>\n\
				</div>'
			},
			complete: function () {
				// Callback
			}
		});*/
        $("#teammember").includeFeed({
            baseSettings: {
                rssURL: ["/consultantsrss.aspx"],
                limit: 200,
                addNBSP: false,
                repeatTag: "consultant"
            },
            templates: {
                itemTemplate:
                /*
                        				'<div class="col-md-4 col-sm-6 col-xs-12 r20_team-member"><a href="/t/{{FriendlyURL}}" title="{{FirstName}} {{LastName}}"><img alt="{{FirstName}} {{LastName}}" class="r20_team-member-photo" src="{ImageURL}}" /><strong class="r20_team-member-name">{{FirstName}}{{LastName</strong><strong class="r20_team-member-position">{{PositionTitle}}</strong></a></div>'*/
                    '<div class="col-md-4 col-sm-6 col-xs-12 r20_team-member">\n\
        				<a href="/t/{{FriendlyURL}}" title="{{FirstName}} {{LastName}}">\n\
        				<img alt="{{FirstName}} {{LastName}}" class="r20_team-member-photo" src="{{ImageURL}}"></a>\n\
        				<strong class="r20_team-member-name">{{FirstName}} {{LastName}}</strong> <strong class="r20_team-member-position">{{PositionTitle}}</strong></a>\n\
        		</div>'
            },
            complete: function () {
                // Callback
            }
        });
        $("#our-people").includeFeed({
            baseSettings: {
                rssURL: ["/consultantsrss.aspx"],
                limit: 200,
                addNBSP: false,
                repeatTag: "consultant"
            },
            templates: {
                itemTemplate: '<div class="single-member"><div class="col-sm-4 col-xs-12">\n\
                <div class="team-image-contain">\n\
					<a href="/t/{{FriendlyURL}}" title="{{FirstName}} {{LastName}}">\n\
                    <img alt="{{FirstName}} {{LastName}}" class="r20_team-member-photo" src="{{ImageURL}}"></a>\n\
                </div>\n\
                </div>\n\
                <div class="col-sm-8 col-xs-12 r20_team-member">\n\
                        <h2>{{FirstName}} {{LastName}}<span>{{PositionTitle}}</span></h2>\n\
                        <div class="r20_team-member-short-description">{{ShortDescription}}</div>\n\
                        <div class="r20_team-member-description">{{FullDescription}}</div>\n\
                </div></div>'
            },
            complete: function () {
                // Callback
            }
        });

        var currentURL =window.location.href;
        if($('.languages select').val() == '1'){
            $('h3#jxt-news-filter-industry-heading').html('English Categories');
            $('h3#jxt-news-filter-type-heading').html('Chinese Categories');
            if(currentURL.indexOf('/news.aspx?sortby=latest&categories=1262')>-1){
                var temURL = currentURL.split('&')[0];
                window.location.href = temURL + '&' + 'categories=1261';
            }
            if(currentURL.indexOf('/news.aspx?sortby=latest&categories=1268')>-1){
                var temURL = currentURL.split('&')[0];
                window.location.href = temURL + '&' + 'categories=1267';
            }
            if(currentURL.indexOf('/news.aspx?sortby=latest&categories=1270')>-1){
                var temURL = currentURL.split('&')[0];
                window.location.href = temURL + '&' + 'categories=1269';
            }
            if(currentURL.indexOf('/news.aspx?sortby=latest&categories=1417')>-1){
                var temURL = currentURL.split('&')[0];
                window.location.href = temURL + '&' + 'categories=1410';
            }
            if(currentURL.indexOf('/news.aspx?sortby=latest&categories=1424')>-1){
                var temURL = currentURL.split('&')[0];
                window.location.href = temURL + '&' + 'categories=1413';
            }

            if(currentURL.indexOf('/news.aspx?sortby=latest&categories=1269,1270')>-1||
                currentURL.indexOf('/news.aspx?sortby=latest&categories=1269')>-1||
                currentURL.indexOf('/news.aspx?sortby=latest&categories=1270')>-1){
                $('.jxt-news-container h1').html('Industry Insights');
            }
            if(currentURL.indexOf('/news.aspx?sortby=latest&categories=1413,1424')>-1||
                currentURL.indexOf('/news.aspx?sortby=latest&categories=1424')>-1||
                currentURL.indexOf('/news.aspx?sortby=latest&categories=1413')>-1){
                 $('.jxt-news-container h1').html('Career Guidance');
            }
            if(currentURL.indexOf('/news.aspx?sortby=latest&categories=1267,1268')>-1||
                currentURL.indexOf('/news.aspx?sortby=latest&categories=1268')>-1||
                currentURL.indexOf('/news.aspx?sortby=latest&categories=1267')>-1){
                 $('.jxt-news-container h1').html('Events');
            }
            if(currentURL.indexOf('/news.aspx?sortby=latest&categories=1410,1417')>-1||
                currentURL.indexOf('/news.aspx?sortby=latest&categories=1417')>-1||
                currentURL.indexOf('/news.aspx?sortby=latest&categories=1410')>-1){
                 $('.jxt-news-container h1').html('B With You');
            }
                    // if user logged in, change register links to dashboard.
        if ($(".user-loggedIn").length) {
            $("a[href='/member/register.aspx']").text("My Dashboard");
            $("a[href='/member/register.aspx']").attr("href", "/member/default.aspx");
            $("a[href='/member/login.aspx']").text("Logout");
            $("a[href='/member/login.aspx']").attr("href", "/logout.aspx");
        }
        if($('.jxt-news-filter-container').length){
            $('.jxt-news-search a').html('<i class="fa fa-search"></i> Search');
            $('.jxt-news-filter-container h2').text('Search');
        }
        }else{
            $('h3#jxt-news-filter-industry-heading').html('英文类别');
            $('h3#jxt-news-filter-type-heading').html('中文类别');
            if(currentURL.indexOf('/news.aspx?sortby=latest&categories=1261')>-1){
                var temURL = currentURL.split('&')[0];
                window.location.href = temURL + '&' + 'categories=1262';
            }
            if(currentURL.indexOf('/news.aspx?sortby=latest&categories=1267')>-1){
                var temURL = currentURL.split('&')[0];
                window.location.href = temURL + '&' + 'categories=1268';
            }
            if(currentURL.indexOf('/news.aspx?sortby=latest&categories=1269')>-1){
                var temURL = currentURL.split('&')[0];
                window.location.href = temURL + '&' + 'categories=1270';
            }
            if(currentURL.indexOf('/news.aspx?sortby=latest&categories=1410')>-1){
                var temURL = currentURL.split('&')[0];
                window.location.href = temURL + '&' + 'categories=1417';
            }
            if(currentURL.indexOf('/news.aspx?sortby=latest&categories=1413')>-1){
                var temURL = currentURL.split('&')[0];
                window.location.href = temURL + '&' + 'categories=1424';
            }

            if(currentURL.indexOf('/member/register.aspx')>-1){
                $('#ctl00_ContentPlaceHolder1_pnlRequiredRegistration label[for="ctl00_ContentPlaceHolder1_ddlTitle"]').html('称呼');
                $('#ctl00_ContentPlaceHolder1_pnlRequiredRegistration label[for="ctl00_ContentPlaceHolder1_txtFirstName"]').html('名 <span class="form-required">*</span>');
                $('#ctl00_ContentPlaceHolder1_pnlRequiredRegistration label[for="ctl00_ContentPlaceHolder1_txtSurname"]').html('姓 <span class="form-required">*</span>');
                $('#ctl00_ContentPlaceHolder1_pnlRequiredRegistration label[for="ctl00_ContentPlaceHolder1_txtConfirmPassword"]').html('再次输入密码 <span class="form-required">*</span>');
                $('#ctl00_ContentPlaceHolder1_pnlRequiredRegistration label[for="ctl00_ContentPlaceHolder1_txtConfirmEmail"]').html('再次输入电子邮箱地址 <span class="form-required">*</span>');
                $('#ctl00_ContentPlaceHolder1_pnlRequiredRegistration label[for="ctl00_ContentPlaceHolder1_ddlLanguage"]').html('电子邮件首选语言');
                $('h3.MemberFullRegisterHeader').html('完整注册 – 单击展开');
                $('#ctl00_ContentPlaceHolder1_pnlFullRegistration label[for="ctl00_ContentPlaceHolder1_txtSuburb"]').html('所在城市');
                $('#ctl00_ContentPlaceHolder1_pnlFullRegistration label[for="ctl00_ContentPlaceHolder1_txtState"]').html('省份');
                $('#ctl00_ContentPlaceHolder1_pnlFullRegistration #ctl00_ContentPlaceHolder1_ddlCountry option[value="0"]').html('请选择');
                $('#ctl00_ContentPlaceHolder1_pnlFullRegistration label[for="ckAddMailingAddress').html('增添电子邮件地址');
                $('#ctl00_ContentPlaceHolder1_pnlFullRegistration label[for="ctl00_ContentPlaceHolder1_ddlClassification').html('工作类别');
                $('#ctl00_ContentPlaceHolder1_pnlFullRegistration label[for="ddlSubClassification').html('细分类别');
                $('#btnSubmit').val('提交');
            }
            if(currentURL.indexOf('/member/createjobalert.aspx')>-1){
                // $('fieldset h1:first-child').html('创建职位提醒');
                $('fieldset h3').html('职位提醒设置');
                $('#ctl00_ContentPlaceHolder1_pnlJobAlert label[for="ctl00_ContentPlaceHolder1_tbFirstName"]').html('名 <span class="form-required">*</span>');
                $('#ctl00_ContentPlaceHolder1_pnlJobAlert label[for="ctl00_ContentPlaceHolder1_tbSurname"]').html('姓 <span class="form-required">*</span>');
                $('#ctl00_ContentPlaceHolder1_pnlJobAlert label[for="tbPassword"]').html('密码设置 <span class="form-required">*</span>');
                $('#ctl00_ContentPlaceHolder1_pnlJobAlert label[for="ctl00_ContentPlaceHolder1_tbEmail"]').html('电子邮箱地址 <span class="form-required">*</span>');
                $('#ctl00_ContentPlaceHolder1_pnlJobAlert label[for="ctl00_ContentPlaceHolder1_txtNameOfTheFeed"]').html('为您的职位提醒信息设置一个专属的名称');
                var inputVal = $('#ctl00_ContentPlaceHolder1_chkSendEmailAlerts');
                // $('#ctl00_ContentPlaceHolder1_pnlSendEmailAlerts ul li.mini-main-alert').empty();
                $('#ctl00_ContentPlaceHolder1_pnlSendEmailAlerts ul li.mini-main-alert').html('我愿意接收通过电子邮件发送给我的职位提醒信息').prepend( inputVal );
                $('#ctl00_ContentPlaceHolder1_pnlJobAlert label[for="ctl00_ContentPlaceHolder1_ucJobAlert1_txtKeywords"]').html('关键词');
                $('#ctl00_ContentPlaceHolder1_pnlJobAlert #search-classification p.section-heading').html('职位类别');
                $('#ctl00_ContentPlaceHolder1_pnlJobAlert #search-locationarea p.section-heading').html('工作地点');
                $('#ctl00_ContentPlaceHolder1_pnlJobAlert #search-salary p.section-heading').html('薪资范围');
                $('#ctl00_ContentPlaceHolder1_pnlJobAlert #ctl00_ContentPlaceHolder1_ucJobAlert1_UpdatePanel1 ul li label[for="ctl00_ContentPlaceHolder1_ucJobAlert1_ddlSalary"]').html('薪资类别');
                $('#ctl00_ContentPlaceHolder1_pnlJobAlert #ctl00_ContentPlaceHolder1_ucJobAlert1_UpdatePanel1 ul li label[for="ctl00_ContentPlaceHolder1_ucJobAlert1_txtSalaryUpperBand"]').html('至');
                $('#ctl00_ContentPlaceHolder1_pnlJobAlert label[for="ctl00_ContentPlaceHolder1_ucJobAlert1_ddlProfession').html('工作类别');
                $('#ctl00_ContentPlaceHolder1_pnlJobAlert label[for="ctl00_ContentPlaceHolder1_ucJobAlert1_ddlRole').html('细分类别');
            }
            if(currentURL.indexOf('/news.aspx?sortby=latest&categories=1269,1270')>-1||
                currentURL.indexOf('/news.aspx?sortby=latest&categories=1269')>-1||
                currentURL.indexOf('/news.aspx?sortby=latest&categories=1270')>-1){
                $('.jxt-news-container h1').html('行业洞见');
            }
            if(currentURL.indexOf('/news.aspx?sortby=latest&categories=1261,1262')>-1||
                currentURL.indexOf('/news.aspx?sortby=latest&categories=1261')>-1||
                currentURL.indexOf('/news.aspx?sortby=latest&categories=1262')>-1){
                $('.jxt-news-container h1').html('公司新闻');
            }
            if(currentURL.indexOf('/news.aspx?sortby=latest&categories=1413,1424')>-1||
                currentURL.indexOf('/news.aspx?sortby=latest&categories=1424')>-1||
                currentURL.indexOf('/news.aspx?sortby=latest&categories=1413')>-1){
                 $('.jxt-news-container h1').html('职业建议');
            }
            if(currentURL.indexOf('/news.aspx?sortby=latest&categories=1267,1268')>-1||
                currentURL.indexOf('/news.aspx?sortby=latest&categories=1268')>-1||
                currentURL.indexOf('/news.aspx?sortby=latest&categories=1267')>-1){
                 $('.jxt-news-container h1').html('公司活动');
            }
            if(currentURL.indexOf('/news.aspx?sortby=latest&categories=1410,1417')>-1||
                currentURL.indexOf('/news.aspx?sortby=latest&categories=1417')>-1||
                currentURL.indexOf('/news.aspx?sortby=latest&categories=1410')>-1){
                 $('.jxt-news-container h1').html('B With You公益中心');
            }
            if($('.boardy-apply-content').length){
                $('.boardyApplyWith#applywith h3').html('通过Linkedin申请');
                if($('.boardyLoginWithSocial').length){
                    $('p.boardyNotRegistered').html('<span class></span>没有注册？请点击 <a href="#" class="regtrigger">这里</a> 在下方快速申请');
                }
            }
            if($('.boardy-apply-content').length && $('#miniMemberLoggedIn').length == 0){
                var applyInput = $('#ctl00_ContentPlaceHolder1_cbRememberMe');
                $('#ctl00_ContentPlaceHolder1_cbRememberMe').parent().html('记住我').prepend( applyInput );
            }
            if($('.boardy-apply-content').length){
                var coverLetter = $('.boardy-coverletter-options #rbWriteOneNow');
                $('#clWriteOwn label').html('现在撰写一份').prepend( coverLetter );
            }
            if(currentURL.indexOf('/job/emailfriend/')>-1){
                $('.content-holder h1').html('通过邮件与朋友分享职位说明');
            }
            if(currentURL.indexOf('/member/login.aspx')>-1){
                $('a.memberlogin-forgetpassword').html('忘记密码');
                if($('li#memberlogin-errorMessage p').html().length > 40){
                    $('li#memberlogin-errorMessage p').html("访问被拒绝。用户名或密码不正确");
                }
            }
            if(currentURL.indexOf('/advancedsearch.aspx?search=1')>-1){
                $('.button.favourite-search-button a').html('将该搜索结果设为意向职位');
                $('.button.create-alert-button a').html('创建为职位提醒');
            }
            if($('#boardy-createalert-cont').length){
                $('#boardy-createalert-cont .boardy-poptitle h2').text('为该职位提醒设置一个名称');
                $('#boardy-createalert-cont p a[href="/member/myjobalerts.aspx"]').text('我的职位提醒');
            }
            // if user logged in, change register links to dashboard.
            if ($(".user-loggedIn").length) {
                $("a[href='/member/register.aspx']").text("个人中心");
                $("a[href='/member/register.aspx']").attr("href", "/member/default.aspx");
                $("a[href='/member/login.aspx']").text("退出账号");
                $("a[href='/member/login.aspx']").attr("href", "/logout.aspx");
            }
            if ($("#lbApplied").length) {
                var appliedJob = $("#lbApplied span").html().split('/');
                var appliedY = appliedJob[2];
                var appliedM = appliedJob[1];
                var appliedD = appliedJob[0];
                $('span#lbApplied').html('你于' + appliedJob[2] + '年' + appliedJob[1] + '月' + appliedJob[0] + '日申请了该职位。');
            }
            // User Account changes
            if($('#miniMemberLoggedIn').length){
                $('ul#memberProfileLinks ul li#memberProfileHome a').html('个人中心');
                $('ul#memberProfileLinks ul li#memberProfileAlerts a').html('意向职位/职位提醒');
                if(currentURL.indexOf('/member/default.aspx')>-1){

                    $('a[title="Summary"]').attr('title', '个人总结');
                    $('a[title="Experience"]').attr('title', '经验');
                    $('a[title="Education"]').attr('title', '教育');
                    $('a[title="Skills"]').attr('title', '技能');
                    $('a[title="Certifications & Memberships"]').attr('title', '证书及会员');
                    $('a[title="Licenses"]').attr('title', '许可证');
                    $('a[title="Roles"]').attr('title', '意向职业');
                    $('a[title="Attach Resume"]').attr('title', '添加简历');
                    $('a[title="Attach Coverletter"]').attr('title', '添加求职信');
                    $('a[title="Languages"]').attr('title', '语言能力');
                    $('a[title="Reference"]').attr('title', '参考资料');

                    $('h1.CV-Builder-title').html('个人中心');
                    $('#box-table-saved thead tr th.action-head').html('详细');
                    $('#box-table-saved tbody tr td.action-cell a').each(function(){
                        $(this).html('浏览');
                    });
                    $('#ctl00_ContentPlaceHolder1_updatePanel1 .db_section-header h2').html('意向职位/职位提醒');

                    $('#box-profile-info h5 strong').html('看看您的会员注册进行到哪一步了？');
                    $('#box-profile-info h5.text-incomplete strong').html('需要完善的信息');
                    $('#box-profile-status .db_section-content h2').html('我的资料完整度');
                    var statusInfoArray = ['注册', '验证', '个人信息完善'];
                    $('.jxt_dash-statusInfo').each(function(index){
                        var statusIcon = $(this).find('.fa-check');
                        $(this).html(statusInfoArray[index]).prepend(statusIcon);
                    });
                }
                if(currentURL.indexOf('/member/myjobalerts.aspx')>-1){
                    $('table#box-table tr th:nth-of-type(4)').html('操作');
                    $('.content-holder h1').html('意向职位/职位提醒');
                }
                if($('.jxt-news-filter-container').length){
                    $('.jxt-news-search a').html('<i class="fa fa-search"></i> 搜索');
                    $('.jxt-news-filter-container h2').text('搜索');
                }
            }
        }
        if($('.jxt-news-container h1').length){
            var headingOne = $('.jxt-news-container h1').text();
            if(headingOne.indexOf('B With You')>-1){
                 $('.jxt-news-container h1').html('<img src="/media/B-recruit/images/b-with-you-logo.jpg" alt="B With You">');
                 $('.b-with-you-description').insertBefore($('p.jxt-news-refine-summary'));
                 $('.b-with-you-description').css('display','block');
            }
        }
        if($('.jxt-news-filter-container').length){
            $('.jxt-news-search').insertAfter($('.jxt-news-filter.jxt-news-filter-keywords'));
        }
        // expandable tab
        $(".r20_tab-heading a").click(function (e) {
            if (!$(this).attr("href")) {
                e.preventDefault();
                $(this).parent().parent().toggleClass("active");
                $(this).parent().parent().next(".r20_tab-content").toggleClass("active");
            }
        });
        // if tab is in hash, click it automatically.
        if (location.hash.toLowerCase() && $(location.hash.toLowerCase()).length) {
            $(location.hash.toLowerCase()).find("a").click();
            scrollToDiv(location.hash.toLowerCase());
        }
        // in case top navigation redirects to a hash.
        $("#r20_navigation a, #r20_left-navigation a").click(function (e) {
            var myLink = $(this).attr("href") || "";
            var myHash = myLink.substr(myLink.indexOf("#"));
            var myHeadingLink = $(myHash + ".r20_tab-heading");
            if (myHeadingLink.length) {
                e.preventDefault();
                myHeadingLink.find("a").click();
                scrollToDiv(myHeadingLink);
            }
        });
        // add iframe url for a map
        function loadMap(iframeObject) {
            // if the iframe has no src or a blank src, and it has a data-src attribute
            if (!(iframeObject.attr("src") && iframeObject.attr("src").length) && iframeObject.attr("data-src")) {
                iframeObject.attr("src", iframeObject.attr("data-src"));
            }
        }
        // scroll to a map
        function scrollToDiv(divID) {
            $("html, body").animate({
                scrollTop: $(divID).offset().top - ($(".r20_sticky-header #r20_header-container").height() || 0) - 20
            }, 300);
        }
        // if a location hash is on the url, add active to the div.
        if (location.hash && $(location.hash + ".r20_map").length) {
            $(location.hash + ".r20_map").addClass("active");
        } else {
            // otherwise, just make the first map active.
            $(".r20_map:first").addClass("active");
        }
        loadMap($(".r20_map.active iframe"));
        // contact page maps on click
        $(".r20_contact-map-link, .footer-location a, #r20_locations a").click(function (e) {
            var myLink = $(this).attr("href")
            var targetMap = $(myLink.substr(myLink.indexOf("#")));
            if (targetMap.length) {
                e.preventDefault();
                loadMap(targetMap.children("iframe"));
                scrollToDiv(targetMap);
                $(".r20_map").not(targetMap).removeClass("active");
                targetMap.addClass("active");
            }
        });
        // contact page stop scrolling until clicked.
        $(".r27_map-overlay").click(function () {
            $(this).hide();
        });
    });
    $(document).ready(function () {
        equalhight();
        $(window).resize(function () {
            equalhight();
        });
        // $('input,textarea').placeholder();
    });

    function equalhight() {
        var $height = 0;
        $(".contact").each(function () {
            $(this).css("height", "auto");
            if (($(this).outerHeight()) > $height) {
                $height = $(this).outerHeight();
            }
        });
        $(".contact").each(function () {
            $(this).css("height", $height);
        });
    }

    $(document).ready(function () {
        $('.slider4').bxSlider({
            slideWidth: 195,
            minSlides: 1,
            maxSlides: 5,
            moveSlides: 1,
            slideMargin: 30,
            pager: false,
            auto: true,
            controls: true

        });

        if (window.ActiveXObject || "ActiveXObject" in window) { // IE Detector
            $('body').addClass('ie-browser');
        }

        if (navigator.userAgent.indexOf("Safari") > -1) {
            $('body').addClass('safari-browser');
        }

        $('.job-finder').click(function () {
            if ($(window).width() > 767) {
                if (!$(this).hasClass('active')) {


                    $(this).addClass('active');
                    $('.search-wrapper').fadeIn();
                } else {

                    $('.search-wrapper').fadeOut();
                    $(this).removeClass('active');
                }
            }
        });

        $('.jxt-news-filter-options ul li input[value="1420"]').parent().css('display', 'none');
        $('.jxt-news-filter-options ul li input[value="1421"]').parent().css('display', 'none');
        $('.jxt-news-filter-options ul li input[value="1422"]').parent().css('display', 'none');
        $('.jxt-news-filter-options ul li input[value="1423"]').parent().css('display', 'none');
        // $('#r20_job-search-work-type select option').each(function () {
        //     if ($(this).attr('value') == -1) {
                
        //         $(this).text("- All Industries -");
        //     }
        // });
        // $('#r20_job-search-classifications select option').each(function () {
        //     if ($(this).attr('value') == -1) {
                
        //         $(this).text("- All Functions -");
        //     }
        // });
        
        $('#ctl00_ContentPlaceHolder1_ucJobFields_lbWorkType').html("All Industries <span class='form-required'>*</span> ");
        $('#ctl00_ContentPlaceHolder1_ucJobFields_lbProfession').html("All Functions <span class='form-required'>*</span> ");

    });
})(jQuery);
/*function alx_browser_body_class( $classes ) {
    global $is_lynx, $is_IE, $is_iphone;
 
    if($is_lynx) $classes[] = 'lynx';
    elseif($is_IE) {
        $browser = $_SERVER['HTTP_USER_AGENT'];
        $browser = substr( "$browser", 25, 8);
        if ($browser == "MSIE 7.0"  ) {
            $classes[] = 'ie7';
            $classes[] = 'ie';
        } elseif ($browser == "MSIE 6.0" ) {
            $classes[] = 'ie6';
            $classes[] = 'ie';
        } elseif ($browser == "MSIE 8.0" ) {
            $classes[] = 'ie8';
            $classes[] = 'ie';
        } elseif ($browser == "MSIE 9.0" ) {
            $classes[] = 'ie9';
            $classes[] = 'ie';
        } else {
            $classes[] = 'ie';
        }
    }
    else $classes[] = 'unknown';
 
    if( $is_iphone ) $classes[] = 'iphone';
 
    return $classes;
}*/

function CustomFunction(pageurl){
    //console.log('this is triggered before ' + pageurl);
    if( pageurl =="member/profile.aspx" || pageurl == undefined ){
        //basicProfile section
        $('select#ctl00_ContentPlaceHolder1_ddlEducationAddQualificationLevel option[value="9"]').remove();
        $('select#ctl00_ContentPlaceHolder1_ddlEducationAddQualificationLevel option[value="10"]').remove();
        $('select#ctl00_ContentPlaceHolder1_ddlEducationAddQualificationLevel option[value="11"]').remove();
        $('select#ctl00_ContentPlaceHolder1_ddlEducationAddQualificationLevel option[value="3"]').remove();
        $('select#ctl00_ContentPlaceHolder1_ddlEducationAddQualificationLevel option[value="2"]').remove();
        if($('.languages select').val() == '7'){
            $('h3#incompleteSectionHeading').html('待完善信息');
            $('p.empty-case_field').html('新增条目');
            // $('#personalDetailsSlider span').each(function(){
            //     if($(this).html()
            // });
            $('span#ctl00_ContentPlaceHolder1_validatorHomePhone').html('请勿填写除数字、空格、+以外的信息');
            $( "#personalDetailsSlider span:contains('丢失的信息')" ).html("待完成的信息"); 
            if($('#basicProfile').length){
                $('label[for="ctl00_ContentPlaceHolder1_ddlProfileCurrentStatus"]').html('当前求职状态');
                // $('select#ctl00_ContentPlaceHolder1_ddlProfileCurrentStatus option[value="1"]').text('目前正在寻找机会');
                // $('select#ctl00_ContentPlaceHolder1_ddlProfileCurrentStatus option[value="3"]').text('目前不考虑新机会');
            }
            if($('#personalDetailsform').length){
                $('label[for="ctl00_ContentPlaceHolder1_tbDetailsSuburb"]').html('城市/镇 :');
                $('input#ctl00_ContentPlaceHolder1_tbDetailsSuburb').attr('placeholder', '城市/镇');
                $('label[for="ctl00_ContentPlaceHolder1_tbDetailsState"]').html('省份/州 :');
                $('input#ctl00_ContentPlaceHolder1_tbDetailsState').attr('placeholder', '省份/州');

                $('label[for="ctl00_ContentPlaceHolder1_rbPreferHomePhone"]').html('选为首选联系方式 :');
                $('label[for="ctl00_ContentPlaceHolder1_rbPreferMobilePhone"]').html('选为首选联系方式 :');

            }
            if($('#newExperience').length){
                $('label[for="ctl00_ContentPlaceHolder1_cbExperienceAddCurrent"]').html('目前还在职 :');
                $('label[for="ctl00_ContentPlaceHolder1_tbExperienceAddCity"]').html('城市/镇 :');
                $('input#ctl00_ContentPlaceHolder1_tbExperienceAddCity').attr('placeholder', '城市/镇');
                $('label[for="ctl00_ContentPlaceHolder1_tbExperienceAddState"]').html('省份/州 :');
                $('input#ctl00_ContentPlaceHolder1_tbExperienceAddState').attr('placeholder', '省份/州');
            }
            if($('#newEducation').length){
                $('label[for="ctl00_ContentPlaceHolder1_tbEducationAddState"]').html('城市/州 :');
                $('input#ctl00_ContentPlaceHolder1_tbEducationAddState').attr('placeholder', '城市/州');
                $('label[for="ctl00_ContentPlaceHolder1_cbEducationAddGraduated"]').html('已毕业 :');
                $('label[for="ctl00_ContentPlaceHolder1_tbEducationAddGraduatedCredits"]').html('毕业学分');
                $('label[for="ctl00_ContentPlaceHolder1_ddlEducationAddQualificationLevel"]').html('学历文凭 :');

                $('select#ctl00_ContentPlaceHolder1_ddlEducationAddQualificationLevel option[value="13"]').text('高中');
                $('select#ctl00_ContentPlaceHolder1_ddlEducationAddQualificationLevel option[value="7"]').text('硕士研究生');
                $('select#ctl00_ContentPlaceHolder1_ddlEducationAddQualificationLevel option[value="14"]').text('博士研究生');

            }
            if($('#newLicense').length){
                $('label[for="ctl00_ContentPlaceHolder1_tbLicenseAddState"]').html('城市/州 :');
                $('input#ctl00_ContentPlaceHolder1_tbLicenseAddState').attr('placeholder', '城市/州');
            }
            if($('#editRole').length){
                $('label[for="ctl00_ContentPlaceHolder1_ddlRolePreferenceDesiredLocation"]').html('意向城市 :');
                $('label[for="ctl00_ContentPlaceHolder1_ddlRolePreferenceDesiredRegion"]').html('意向区域 :');
                $('label[for="ctl00_ContentPlaceHolder1_ddlRolePreferenceEligibleToWorkIn"]').html('在该地有合法工作资质 :');
                $('#editRole .btn-group button').each(function(){
                    $(this).html('未选择 <b class="caret"></b>');
                })
            }
            if($('#newCnM').length){
                $('label[for="ctl00_ContentPlaceHolder1_tbCertificateAddAuthority"]').html('授予/颁发机构 <span class="form-required">*</span> :');
            }
        }
    }
}