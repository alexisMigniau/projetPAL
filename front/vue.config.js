module.exports = {
    transpileDependencies: ["vuetify"],
    devServer: {
        proxy: "http://back:" + process.env.NODE_DOCKER_PORT,
        disableHostCheck: true
    },
};
