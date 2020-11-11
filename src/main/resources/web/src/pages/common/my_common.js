export const View = {
    Component: class {
        create(){
            throw new Error('Not support operation:abstract method');
        };
    }
};
console.log('Hi I am common.js');
