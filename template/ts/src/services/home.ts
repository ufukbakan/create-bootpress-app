import { Route } from "bootpress";

class HomeService {
    getHomePage = Route().to(() => "hello world");
}

export const homeService = new HomeService();