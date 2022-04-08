const config = {
    "password": "password",
    "interval": "5000",
    "expire": "30000",
    "offline": "主播正在划水"
};

addEventListener("fetch", (event) => {
    event.respondWith(
        handleRequest(event.request).catch(
            (err) => new Response(err.stack, { status: 500 })
        )
    );
});

const html = `
<!doctype html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>A Live Streaming Platform for OIers | OIer Live</title>
    <style>
        html, body {
            width: 100%;
            height: 100%;
            margin: 0;
        }

        header {
            width: 100%;
            height: 4em;
            position: absolute;
            top: 0;
        }
        
        nav {
            width: 100%;
            height: 100%;
            background-color: #fff;
            font-size: 1.6em;
            box-shadow: 0 .1em .4em #e3e2e3;
            display: flex;
        }

        .holder {
            width: 100%;
            height: 4.7em;
        }

        .navbar {
            text-align: center;
            margin: auto;
        }

        .navbar .header {
            color: #5b6369;
        }

        .navbar .header>img {
            height: 1.2em;
            position: relative;
            top: .2em
        }

        .container {
            width: 75%;
            min-width: 1200px;
            margin: auto;
        }

        @media only screen and (max-width: 1200px) {
            .container {
                width: 100%;
                min-width: unset;
            }
        }

        .main {
            width: 100%;
            height: 580px;
            min-height: 580px;
            display: flex;
        }

        .main aside {
            width: calc(19% - .4em);
            height: 100%;
            background-color: #f5f4f5;
            border: 1px solid #ebeaeb;
            border-radius: 1em;
            box-sizing: border-box;
            box-shadow: 0 .1em .4em #e3e2e3;
            margin-right: .8em;
            padding: 0 1em;
            overflow-x: hidden;
            word-wrap: break-word;
            overflow-y: scroll;

        }

        .main main {
            width: calc(81% - .4em);
            height: 100%;
            background-color: #000;
            border-radius: 1em;
            box-sizing: border-box;
            box-shadow: 0 .1em .4em #bbbabb;
            padding: 0;
            overflow: hidden;
        }

        #player {
            display: block;
            max-width: 100%;
            max-height: 100%;
            margin: auto;
            position: relative;
            top: 50%;
            transform: translateY(-50%);
        }

        
        @media only screen and (max-width: 1200px) {
            .main aside {
                width: calc(21% - .4em);
            }

            .main main {
                width: calc(79% - .4em);
            }
        }
        
        @media only screen and (max-width: 1100px) {
            .main aside {
                width: calc(25% - .4em);
            }

            .main main {
                width: calc(75% - .4em);
            }
        }

        @media only screen and (max-width: 880px) {
            .main {
                width: 100%;
                height: unset;
                min-height: unset;
                display: block;
            }

            .main aside {
                width: 100%;
                min-height: 7em;
                margin-bottom: .5em;
                margin-right: unset;
            }

            .main main {
                width: 100%;
                height: max-content;
            }

            #player {
                display: block;
                width: 100%;
                margin: auto;
                position: relative;
                top: 0;
                transform: none;
            }
        }
        
        .banners {
            margin-top: .7em;
        }

        .banner-item {
            width: 100%;
            border-radius: 1em;
            box-sizing: border-box;
            box-shadow: 0 .1em .4em #e3e2e3;
        }

        #offline {
            color: #5b6369;
            position: relative;
            top: 50%;
            transform: translateY(-50%);
            text-align: center;
        }
    </style>
</head>

<body>
    <header>
        <nav>
            <div class="navbar">
                <div class="header">
                    <img src="https://static.pisearch.cn/logonew.min.svg">
                    <span>OIer Live</span>
                </div>
            </div>
        </nav>
    </header>
    <div class="holder"></div>
    <div class="container">
        <section class="main">
            <aside id="notice-board">
                <h2>公告</h2>
                <p id="notice"></p>
            </aside>
            <main>
                <img id="player" src="https://via.placeholder.com/1920x1080">
                <h1 id="offline"> \${offline} </h1>
            </main>
        </section>
        <section class="banners">
            <a class="banner" href="https://oier.space/" target="_blank">
                <img class="banner-item" src="https://s1.ax1x.com/2022/04/06/qXXo4K.png" alt="免费创建博客 - OIer Space" title="免费创建博客 - OIer Space">
            </a>
        </section>
    </div>
    <script src="https://cdn.jsdelivr.net/gh/markedjs/marked@2.0.1/marked.min.js"></script>
    <script src="https://lf9-cdn-tos.bytecdntp.com/cdn/expire-1-M/jquery/3.6.0/jquery.min.js"></script>
    <script>
        $("#notice").html(marked(decodeURI(window.atob("\${notedata}"))))
        function load_data() {
            $.ajax({
                url: "../live/image",
                type: "get",
                success: function (data, status) {
                    if (data.image === "offline" || !data.image || data.image === "") {
                        $("#offline").attr("display", "inline-block");
                        $("#player").attr("display", "none").attr("src", "");
                    } else {
                        $("#offline").attr("display", "none");
                        $("#player").attr("display", "block");
                        $("#player").attr("src", \`data:image/jpg;base64,\${ data.image }\`)
                        $("#notice").html(decodeURI(marked(decodeURI(data.note))))
                    }
                },
                error: function (data, status) {
                    console.log("Fetch error")
                    console.log(data)
                }
            })
        }
        load_data()
        setInterval(load_data, \${interval})
    </script>
</body>
</html>`;

const render = (tpl, variables) => {
    for (let key in variables) {
        const reg = new RegExp('\\$\\{' + key + '\\}', 'g');
        tpl = tpl.replace(reg, variables[key]);
    }
    return tpl;
}

async function handleRequest(request) {
    console.log(config)
    config.interval
    config.expire
    const { pathname } = new URL(request.url);
    if (pathname.startsWith("/api")) {
        return new Response(await request.json(), {
            headers: { "Content-Type": "application/json" },
        });
    }
    
    if (pathname.startsWith("/post")) {
        const context = await request.json();
        const img = context["image"],
            txt = context["text"],
            pw = context["password"];
        if (config.password === pw) {
            await OIERLIVE.put("note", txt);
            await OIERLIVE.put("image", img);
            await OIERLIVE.put("lastupdate", new Date().getTime().toString());
            return new Response("Success", {
                headers: { "Content-Type": "text/html" },
            });
        } else {
            return new Response("Failed", {
                headers: { "Content-Type": "text/html" },
            });
        }
    }

    if (pathname.startsWith("/live/image")) {
        let display = await OIERLIVE.get("image");
        let displaynote = await OIERLIVE.get("note");
        if (!displaynote) displaynote = "暂无笔记";
        if (new Date().getTime() - await OIERLIVE.get("lastupdate") >= config.expire) {
            display = "offline";
        } else {
            if (!display) display = "";
        }
        return new Response(JSON.stringify({"t1": await OIERLIVE.get("lastupdate"),
        "t2": new Date().getTime(),
        "flag": new Date().getTime() - await OIERLIVE.get("lastupdate") >= config.expire,
        "note": displaynote, "image": display}), {
            headers: { "Content-Type": "application/json" },
        });
    }

    if (pathname.startsWith("/live")) {
        const res = render(html, {
            imagedata: await OIERLIVE.get("image"),
            notedata: btoa(encodeURI(await OIERLIVE.get("note"))),
            interval: config.interval,
            offline: config.offline
        });
        return new Response(res, {
            headers: { "Content-Type": "text/html" },
        });
    }

    return fetch("https://exlg.cc");
}