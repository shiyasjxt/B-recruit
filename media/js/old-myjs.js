!(function($) {
    // regular js
    // jquery
    $(function() {
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
        $("#side-drop-menu > li > ul > li > a").each(function() {
            var linkText = $(this).text();
            linkText = linkText.replace(" (", "&nbsp;(");
            $(this).html(linkText);
        });
        // move news rss feed to bottom of news index.
        $(".newsIndex").append($(".newsIndex .search-options"));
        // move date on new page.
        $(".news-individual-container").each(function() {
            $(this).children(".news-excerpt").children("h3").after($(this).children(".news-date"));
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
        $("#r20_mobile-navigation").click(function(e) {
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
            $("#r20_navigation a").each(function() {
                if (location.pathname.toLowerCase() == $(this).attr("href")) {
                    parentIndex = $(this).closest("#r20_navigation > ul > li").index();
                }
            });
            $("#r20_inner-banner-container").prepend($("<img src='/media/B-recruit/images/banners/inner-" + (parentIndex > -1 ? parentIndex : "0") + ".jpg' alt='B-recruit' />"));
        }
        // Latest Jobs widget
        $(".r20_latest-jobs ul").each(function() {
            var dataURL = $(this).attr("data-url");
            $(this).includeFeed({
                baseSettings: {
                    rssURL: [dataURL || "/job/rss.aspx"]
                },
                templates: {
                    itemTemplate: "<li><div class='rss-item' id='rss-item-{{item-index}}'><span class='rss-item-title'><a target='_blank' href='{{link}}'>{{title}}</a></span><span class='rss-item-pubDate'>[[pubDateTemplate]]</span><span class='rss-item-description'>{{description}}</span><span class='rss-item-link'><a href='{{link}}' title='Read more'>Read more&nbsp;&gt;</a></span></div></li>"
                },
                complete: function() {
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
        $(".r20_latest-news ul").each(function() {
            var dataURL = $(this).attr("data-url");
            $(this).includeFeed({
                baseSettings: {
                    rssURL: [dataURL || "/NewsRSS.aspx"]
                },
                templates: {
                    itemTemplate: "<li><div class='rss-item' id='rss-item-{{item-index}}'><span class='rss-item-pubDate'>[[pubDateTemplate]]</span><span class='rss-item-title'><a target='_blank' href='{{link}}'>{{title}}</a></span><span class='rss-item-description'>{{description}}</span><span class='rss-item-link'><a href='{{link}}' title='Read more'>Read more&nbsp;&gt;</a></span></div></li>"
                },
                complete: function() {
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
        $(".r20_testimonials ul").each(function() {
            var dataURL = $(this).attr("data-url");
            $(this).includeFeed({
                baseSettings: {
                    rssURL: [dataURL || "/NewsRSS.aspx"]
                },
                templates: {
                    itemTemplate: "<li><div class='rss-item' id='rss-item-{{item-index}}'><span class='rss-item-description'>{{description}}</span><span class='rss-item-title'><a target='_blank' href='{{link}}'>{{title}}</a></span></div></li>"
                },
                complete: function() {
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
        	baseSettings: {rssURL: ["/consultantsrss.aspx"], limit: 200, addNBSP: false, repeatTag: "consultant"},
        	templates: {
        		itemTemplate:/*
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
            baseSettings: {rssURL: ["/consultantsrss.aspx"], limit: 200, addNBSP: false, repeatTag: "consultant"},
            templates: {
                itemTemplate:'<div class="single-member"><div class="col-sm-4 col-xs-12">\n\
                <div class="team-image-contain">\n\
                    <img alt="{{FirstName}} {{LastName}}" class="r20_team-member-photo" src="{{ImageURL}}">\n\
                </div>\n\
                </div>\n\
                <div class="col-sm-8 col-xs-12 r20_team-member">\n\
                <img class="single-logo" src="/media/B-recruit/images/logo.png" alt="B Recruit">\n\
                        <h2>{{FirstName}} {{LastName}}<span>{{PositionTitle}}</span></h2>\n\
                        <div class="r20_team-member-description">{{FullDescription}}</div>\n\
                </div></div>'
            },
            complete: function () {
                // Callback
            }
        });
        // if user logged in, change register links to dashboard.
        if ($(".user-loggedIn").length) {
            $("a[href='/member/register.aspx']").text("My Dashboard");
            $("a[href='/member/register.aspx']").attr("href", "/member/default.aspx");
            $("a[href='/member/login.aspx']").text("Logout");
            $("a[href='/member/login.aspx']").attr("href", "/logout.aspx");
        }
        // expandable tab
        $(".r20_tab-heading a").click(function(e) {
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
        $("#r20_navigation a, #r20_left-navigation a").click(function(e) {
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
        $(".r20_contact-map-link, .footer-location a, #r20_locations a").click(function(e) {
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
        $(".r27_map-overlay").click(function() {
            $(this).hide();
        });
    });
    $(document).ready(function() {
        equalhight();
        $(window).resize(function() {
            equalhight();
        });
		// $('input,textarea').placeholder();
    });

    function equalhight() {
        var $height = 0;
        $(".contact").each(function() {
            $(this).css("height", "auto");
            if (($(this).outerHeight()) > $height) {
                $height = $(this).outerHeight();
            }
        });
        $(".contact").each(function() {
            $(this).css("height", $height);
        });
    }
	
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