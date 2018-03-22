import NewsConstant from './constant';

export function loadModel(data) {
    return {
        type: NewsConstant.ACTION_LOAD_FORM,
        data: data
    }
}

