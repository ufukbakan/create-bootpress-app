import { RestMethod } from "bootpress";

class HomeService {
    getHomePage() {
        return RestMethod(() => "hello world");
    }
}

export const homeService = new HomeService();