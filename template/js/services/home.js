import { RestService } from "bootpress";

class HomeService {
    getHomePage() {
        return "hello world";
    }
}

export const homeService = RestService(HomeService);