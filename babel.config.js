module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      ["module:react-native-dotenv"],
      "nativewind/babel", // Asegúrate de que esté en formato de cadena, no en un array NOTA
    ],
  };
};
