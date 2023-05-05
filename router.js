export class Router {
    routes = {}

    add(routeName, page) {
        this.routes[routeName] = page
    }

    route(event) {
        event = event || window.event
        event.preventDefault()
    
        window.history.pushState({}, "", event.target.href)
    
        this.handle()
    }

    handle() {
        const { pathname } = window.location
        let route
        if(pathname === "/index.html") {
            route = this.routes["/"]
        } else {
            route = this.routes[pathname] || this.routes[404]
        }
        this.changeBackground(route)
        fetch(route)
        .then(data => data.text())
        .then(html => {
            document.querySelector("#app").innerHTML = html
        })
    }

    changeBackground(route) {
        const page = route.split("pages/")[1].split(".html")[0]

        switch(page) {
            case "home":
                document.body.style.backgroundImage = "url('../assets/mountains-universe-1.png')"
                break
            case "universe":
                document.body.style.backgroundImage = "url('../assets/mountains-universe-2.png')"
                break
            case "exploration":
                document.body.style.backgroundImage = "url('../assets/mountains-universe-3.png')"
                break
            default:
                document.body.style.backgroundImage = "url('../assets/mountains-universe-1.png')"
        }
    }
}