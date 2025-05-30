"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const nest_keycloak_connect_1 = require("nest-keycloak-connect");
const products_controller_1 = require("./products.controller");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            nest_keycloak_connect_1.KeycloakConnectModule.register({
                authServerUrl: 'http://localhost:8080',
                realm: 'Sofa',
                clientId: 'products-app',
                secret: '5GvPhvf2OJHfrttHlQy3Z6iMFd71P6L2',
            }),
        ],
        controllers: [products_controller_1.ProductsController],
        providers: [
            { provide: core_1.APP_GUARD, useClass: nest_keycloak_connect_1.AuthGuard },
            { provide: core_1.APP_GUARD, useClass: nest_keycloak_connect_1.ResourceGuard },
            { provide: core_1.APP_GUARD, useClass: nest_keycloak_connect_1.RoleGuard },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map