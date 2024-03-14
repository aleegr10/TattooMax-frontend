module.exports = {
  images: {
    domains: [
      'www.smashbros.com',
      'images.wikidexcdn.net',
      'www.guiasnintendo.com',
      '2img.net',
      'images4.wikia.nocookie.net',
      'razageek.com',
      'static.vecteezy.com'
    ],
  },
  swcMinify: true, // Añade esta línea para habilitar la minificación con SWC
  webpack: (config, { isServer }) => {
    // Agrega la siguiente línea para activar el modo de depuración de webpack
    config.mode = 'development';

    return config;
  },
}
