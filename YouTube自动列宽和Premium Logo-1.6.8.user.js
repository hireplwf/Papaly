// ==UserScript==
// @name                    YouTube自动列宽和Premium Logo
// @name:zh-CN              YouTube自动列宽和Premium Logo
// @icon                    https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @author                  ElectroKnight22 (modified by ChatGPT: logo-only)
// @namespace               electroknight22_youtube_premium_lite_squared_namespace_logo_only
// @version                 1.6.8
// @match                   *://m.youtube.com/*
// @match                   *://www.youtube.com/*
// @exclude                 *://www.youtube.com/live_chat*
// @grant                   none
// @run-at                  document-start
// @inject-into             page
// @license                 MIT
// @description             YouTube自动列宽和Premium Logo
// @description:zh-CN       YouTube自动列宽和Premium Logo
// ==/UserScript==

/*jshint esversion: 11 */

(function () {
    'use strict';

    // --- 配置区：根据需要调整阈值与列数 ---
    const BREAKPOINTS = [
        { width: 0, cols: 3 },      // 小于等于 next.width 使用 3 列
        { width: 900, cols: 4 },   // >=1200 使用 4 列
        { width: 2600, cols: 5 }    // >=2600 使用 5 列
    ];
    // -----------------------------------------

    let styleEl = null;
    let lastCols = null;

    function calcCols(w) {
        // 按 BREAKPOINTS 从后向前找匹配
        for (let i = BREAKPOINTS.length - 1; i >= 0; i--) {
            if (w >= BREAKPOINTS[i].width) return BREAKPOINTS[i].cols;
        }
        return 3;
    }

    function applyCols(cols) {
        if (cols === lastCols) return;
        lastCols = cols;

        const css = `
            /* 影响 YouTube 主页 / rich grid 布局 的列数变量 */
            ytd-rich-grid-row, ytd-rich-grid-renderer, ytd-rich-grid-media {
                --ytd-rich-grid-items-per-row: ${cols} !important;
            }
            /* 兼容性：强制每项最小宽度（可根据喜好调） */
            ytd-rich-grid-renderer ytd-rich-grid-row > * {
                max-width: calc(100% / ${cols}) !important;
                flex-basis: calc(100% / ${cols}) !important;
            }
        `;

        if (!styleEl) {
            styleEl = document.createElement('style');
            styleEl.setAttribute('data-youtube-auto-grid', '1');
            document.head && document.head.appendChild(styleEl);
            // 若 document.head 还不存在，后面由 observer 补上
        }
        styleEl.textContent = css;
    }

    function update() {
        // 使用视口宽度（考虑缩放和滚动条）
        const w = document.documentElement.clientWidth || window.innerWidth;
        const cols = calcCols(w);
        applyCols(cols);
    }

    // -------------------------------
    // ✅ 从第二个脚本提取：Premium Logo 功能（逻辑保持原样）
    // -------------------------------
    function setPremiumLogo() {
        const logoLight =
            "data:image/svg+xml,%3Csvg xmlns:dc='http://purl.org/dc/elements/1.1/' xmlns:cc='http://creativecommons.org/ns%23' xmlns:rdf='http://www.w3.org/1999/02/22-rdf-syntax-ns%23' xmlns:svg='http://www.w3.org/2000/svg' xmlns='http://www.w3.org/2000/svg' id='SVGRoot' version='1.1' viewBox='0 0 846 174' height='80px' width='391px'%3E%3Cdefs id='defs855'%3E%3Cstyle id='style2' /%3E%3C/defs%3E%3Cmetadata id='metadata858'%3E%3Crdf:RDF%3E%3Ccc:Work rdf:about=''%3E%3Cdc:format%3Eimage/svg+xml%3C/dc:format%3E%3Cdc:type rdf:resource='http://purl.org/dc/dcmitype/StillImage' /%3E%3Cdc:title%3E%3C/dc:title%3E%3C/cc:Work%3E%3C/rdf:RDF%3E%3C/metadata%3E%3Cg id='layer1'%3E%3Cg transform='translate(0,0.36)' data-name='Layer 2' id='Layer_2'%3E%3Cg data-name='Layer 1' id='Layer_1-2'%3E%3Cpath style='fill:%23ff0000' id='path6' d='M 242.88,27.11 A 31.07,31.07 0 0 0 220.95,5.18 C 201.6,0 124,0 124,0 124,0 46.46,0 27.11,5.18 A 31.07,31.07 0 0 0 5.18,27.11 C 0,46.46 0,86.82 0,86.82 c 0,0 0,40.36 5.18,59.71 a 31.07,31.07 0 0 0 21.93,21.93 c 19.35,5.18 96.92,5.18 96.92,5.18 0,0 77.57,0 96.92,-5.18 a 31.07,31.07 0 0 0 21.93,-21.93 c 5.18,-19.35 5.18,-59.71 5.18,-59.71 0,0 0,-40.36 -5.18,-59.71 z' /%3E%3Cpath style='fill:%23ffffff' id='path8' d='M 99.22,124.03 163.67,86.82 99.22,49.61 Z' /%3E%3Cpath style='fill:%23282828' id='path10' d='m 358.29,55.1 v 6 c 0,30 -13.3,47.53 -42.39,47.53 h -4.43 v 52.5 H 287.71 V 12.36 H 318 c 27.7,0 40.29,11.71 40.29,42.74 z m -25,2.13 c 0,-21.64 -3.9,-26.78 -17.38,-26.78 h -4.43 v 60.48 h 4.08 c 12.77,0 17.74,-9.22 17.74,-29.26 z m 81.22,-6.56 -1.24,28.2 c -10.11,-2.13 -18.45,-0.53 -22.17,6 v 76.26 H 367.52 V 52.44 h 18.8 L 388.45,76 h 0.89 c 2.48,-17.2 10.46,-25.89 20.75,-25.89 a 22.84,22.84 0 0 1 4.42,0.56 z M 441.64,115 v 5.5 c 0,19.16 1.06,25.72 9.22,25.72 7.8,0 9.58,-6 9.75,-18.44 l 21.1,1.24 c 1.6,23.41 -10.64,33.87 -31.39,33.87 -25.18,0 -32.63,-16.49 -32.63,-46.46 v -19 c 0,-31.57 8.34,-47 33.34,-47 25.18,0 31.57,13.12 31.57,45.93 V 115 Z m 0,-22.35 v 7.8 h 17.91 V 92.7 c 0,-20 -1.42,-25.72 -9,-25.72 -7.58,0 -8.91,5.86 -8.91,25.72 z M 604.45,79 v 82.11 H 580 V 80.82 c 0,-8.87 -2.31,-13.3 -7.63,-13.3 -4.26,0 -8.16,2.48 -10.82,7.09 a 35.59,35.59 0 0 1 0.18,4.43 v 82.11 H 537.24 V 80.82 c 0,-8.87 -2.31,-13.3 -7.63,-13.3 -4.26,0 -8,2.48 -10.64,6.92 v 86.72 H 494.5 V 52.44 h 19.33 L 516,66.28 h 0.35 c 5.5,-10.46 14.37,-16.14 24.83,-16.14 10.29,0 16.14,5.14 18.8,14.37 5.68,-9.4 14.19,-14.37 23.94,-14.37 14.86,0 20.53,10.64 20.53,28.86 z m 12.24,-54.4 c 0,-11.71 4.26,-15.07 13.3,-15.07 9.22,0 13.3,3.9 13.3,15.07 0,12.06 -4.08,15.08 -13.3,15.08 -9.04,-0.01 -13.3,-3.02 -13.3,-15.08 z m 1.42,27.84 h 23.41 v 108.72 h -23.41 z m 103.39,0 v 108.72 h -19.15 l -2.13,-13.3 h -0.53 c -5.5,10.64 -13.48,15.07 -23.41,15.07 -14.54,0 -21.11,-9.22 -21.11,-29.26 V 52.44 h 24.47 v 79.81 c 0,9.58 2,13.48 6.92,13.48 A 12.09,12.09 0 0 0 697,138.81 V 52.44 Z M 845.64,79 v 82.11 H 821.17 V 80.82 c 0,-8.87 -2.31,-13.3 -7.63,-13.3 -4.26,0 -8.16,2.48 -10.82,7.09 A 35.59,35.59 0 0 1 802.9,79 v 82.11 H 778.43 V 80.82 c 0,-8.87 -2.31,-13.3 -7.63,-13.3 -4.26,0 -8,2.48 -10.64,6.92 v 86.72 H 735.69 V 52.44 H 755 l 2.13,13.83 h 0.35 c 5.5,-10.46 14.37,-16.14 24.83,-16.14 10.29,0 16.14,5.14 18.8,14.37 5.68,-9.4 14.19,-14.37 23.94,-14.37 14.95,0.01 20.59,10.65 20.59,28.87 z' /%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/svg%3E%0A";

        const logoDark =
            "data:image/svg+xml,%3Csvg xmlns:dc='http://purl.org/dc/elements/1.1/' xmlns:cc='http://creativecommons.org/ns%23' xmlns:rdf='http://www.w3.org/1999/02/22-rdf-syntax-ns%23' xmlns:svg='http://www.w3.org/2000/svg' xmlns='http://www.w3.org/2000/svg' id='SVGRoot' version='1.1' viewBox='0 0 846 174' height='24px' width='98px'%3E%3Cdefs id='defs855'%3E%3Cstyle id='style2' /%3E%3C/defs%3E%3Cmetadata id='metadata858'%3E%3Crdf:RDF%3E%3Ccc:Work rdf:about=''%3E%3Cdc:format%3Eimage/svg+xml%3C/dc:format%3E%3Cdc:type rdf:resource='http://purl.org/dc/dcmitype/StillImage' /%3E%3Cdc:title%3E%3C/dc:title%3E%3C/cc:Work%3E%3C/rdf:RDF%3E%3C/metadata%3E%3Cg id='layer1'%3E%3Cg transform='translate(0,0.36)' data-name='Layer 2' id='Layer_2'%3E%3Cg data-name='Layer 1' id='Layer_1-2'%3E%3Cpath style='fill:%23ff0000' id='path6' d='M 242.88,27.11 A 31.07,31.07 0 0 0 220.95,5.18 C 201.6,0 124,0 124,0 124,0 46.46,0 27.11,5.18 A 31.07,31.07 0 0 0 5.18,27.11 C 0,46.46 0,86.82 0,86.82 c 0,0 0,40.36 5.18,59.71 a 31.07,31.07 0 0 0 21.93,21.93 c 19.35,5.18 96.92,5.18 96.92,5.18 0,0 77.57,0 96.92,-5.18 a 31.07,31.07 0 0 0 21.93,-21.93 c 5.18,-19.35 5.18,-59.71 5.18,-59.71 0,0 0,-40.36 -5.18,-59.71 z' /%3E%3Cpath style='fill:%23ffffff' id='path8' d='M 99.22,124.03 163.67,86.82 99.22,49.61 Z' /%3E%3Cpath style='fill:%23ffffff' id='path10' d='m 358.29,55.1 v 6 c 0,30 -13.3,47.53 -42.39,47.53 h -4.43 v 52.5 H 287.71 V 12.36 H 318 c 27.7,0 40.29,11.71 40.29,42.74 z m -25,2.13 c 0,-21.64 -3.9,-26.78 -17.38,-26.78 h -4.43 v 60.48 h 4.08 c 12.77,0 17.74,-9.22 17.74,-29.26 z m 81.22,-6.56 -1.24,28.2 c -10.11,-2.13 -18.45,-0.53 -22.17,6 v 76.26 H 367.52 V 52.44 h 18.8 L 388.45,76 h 0.89 c 2.48,-17.2 10.46,-25.89 20.75,-25.89 a 22.84,22.84 0 0 1 4.42,0.56 z M 441.64,115 v 5.5 c 0,19.16 1.06,25.72 9.22,25.72 7.8,0 9.58,-6 9.75,-18.44 l 21.1,1.24 c 1.6,23.41 -10.64,33.87 -31.39,33.87 -25.18,0 -32.63,-16.49 -32.63,-46.46 v -19 c 0,-31.57 8.34,-47 33.34,-47 25.18,0 31.57,13.12 31.57,45.93 V 115 Z m 0,-22.35 v 7.8 h 17.91 V 92.7 c 0,-20 -1.42,-25.72 -9,-25.72 -7.58,0 -8.91,5.86 -8.91,25.72 z M 604.45,79 v 82.11 H 580 V 80.82 c 0,-8.87 -2.31,-13.3 -7.63,-13.3 -4.26,0 -8.16,2.48 -10.82,7.09 a 35.59,35.59 0 0 1 0.18,4.43 v 82.11 H 537.24 V 80.82 c 0,-8.87 -2.31,-13.3 -7.63,-13.3 -4.26,0 -8,2.48 -10.64,6.92 v 86.72 H 494.5 V 52.44 h 19.33 L 516,66.28 h 0.35 c 5.5,-10.46 14.37,-16.14 24.83,-16.14 10.29,0 16.14,5.14 18.8,14.37 5.68,-9.4 14.19,-14.37 23.94,-14.37 14.86,0 20.53,10.64 20.53,28.86 z m 12.24,-54.4 c 0,-11.71 4.26,-15.07 13.3,-15.07 9.22,0 13.3,3.9 13.3,15.07 0,12.06 -4.08,15.08 -13.3,15.08 -9.04,-0.01 -13.3,-3.02 -13.3,-15.08 z m 1.42,27.84 h 23.41 v 108.72 h -23.41 z m 103.39,0 v 108.72 h -19.15 l -2.13,-13.3 h -0.53 c -5.5,10.64 -13.48,15.07 -23.41,15.07 -14.54,0 -21.11,-9.22 -21.11,-29.26 V 52.44 h 24.47 v 79.81 c 0,9.58 2,13.48 6.92,13.48 A 12.09,12.09 0 0 0 697,138.81 V 52.44 Z M 845.64,79 v 82.11 H 821.17 V 80.82 c 0,-8.87 -2.31,-13.3 -7.63,-13.3 -4.26,0 -8.16,2.48 -10.82,7.09 A 35.59,35.59 0 0 1 802.9,79 v 82.11 H 778.43 V 80.82 c 0,-8.87 -2.31,-13.3 -7.63,-13.3 -4.26,0 -8,2.48 -10.64,6.92 v 86.72 H 735.69 V 52.44 H 755 l 2.13,13.83 h 0.35 c 5.5,-10.46 14.37,-16.14 24.83,-16.14 10.29,0 16.14,5.14 18.8,14.37 5.68,-9.4 14.19,-14.37 23.94,-14.37 14.95,0.01 20.59,10.65 20.59,28.87 z' /%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/svg%3E%0A";

        const premiumLogoCss = `
            :root {
                --logo-light-theme: url("${logoLight}");
                --logo-dark-theme: url("${logoDark}");
            }

            #logo-container .logo,
            .footer-logo-icon,
            #logo-icon,
            #logo-icon-container {
                width: 98px !important;
                content: var(--logo-light-theme) !important;
            }

            html[dark] #logo-icon,
            html[dark] #logo-icon-container {
                content: var(--logo-dark-theme) !important;
            }
        `;

        const premiumLogoStyleNode = document.createElement('style');
        premiumLogoStyleNode.textContent = premiumLogoCss;

        // 有时 document.head 在 document-start 还没准备好，做个兜底
        const append = () => {
            if (document.head && !document.head.contains(premiumLogoStyleNode)) {
                document.head.appendChild(premiumLogoStyleNode);
            }
        };

        if (document.head) {
            append();
        } else {
            // 等待 DOM 就绪再试
            document.addEventListener('DOMContentLoaded', append, { once: true });
        }
    }
    // -------------------------------

    // 监听窗口尺寸变化
    window.addEventListener('resize', () => {
        // 轻微去抖
        clearTimeout(window.__yt_grid_resize_to__);
        window.__yt_grid_resize_to__ = setTimeout(update, 120);
    });

    // 监听 DOM，确保在 SPA 页面切换、头部加载完成后注入样式
    const observer = new MutationObserver(() => {
        if (!document.head) return;
        if (!styleEl) {
            // head 已存在但样式还没插入时插入
            styleEl = document.createElement('style');
            styleEl.setAttribute('data-youtube-auto-grid', '1');
            document.head.appendChild(styleEl);
        }
        update();
    });

    observer.observe(document.documentElement, { childList: true, subtree: true });

    // 首次运行
    // 如果 document.head 尚未就绪，延迟一小会儿再尝试
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', update, { once: true });
        setTimeout(update, 500);
    } else {
        update();
    }

    // 可选：自动在 SPA 路由变化后重新计算（YouTube 使用 history API）
    (function hookHistoryEvents() {
        try {
            const _wr = function (type) {
                const orig = history[type];
                return function () {
                    const rv = orig.apply(this, arguments);
                    window.dispatchEvent(new Event('yt-spa-route'));
                    return rv;
                };
            };
            history.pushState = _wr('pushState');
            history.replaceState = _wr('replaceState');
            window.addEventListener('yt-spa-route', () => setTimeout(update, 300));
        } catch (e) { /* ignore */ }
    })();

    // 🔔 初始化 Premium Logo（保持原脚本风格：在 document-start 就调用一次）
    setPremiumLogo();

})();