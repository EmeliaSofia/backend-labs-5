export declare class ProductsController {
    private products;
    getAll(): {
        id: number;
        name: string;
    }[];
    create(body: {
        name: string;
    }): {
        id: number;
        name: string;
    };
    update(id: number, body: {
        name: string;
    }): {
        id: number;
        name: string;
    };
    delete(id: number): {
        deleted: number;
    };
}
