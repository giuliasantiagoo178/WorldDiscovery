document.addEventListener('DOMContentLoaded', function() {
  const continentInfo = {
    'north-america': {
      continent: 'América do Norte',
      river: 'Rio Mississippi',
      mountain: 'Denali',
      landmarks: 'Grand Canyon, Estátua da Liberdade, Cataratas do Niágara'
    },
    'south-america': {
      continent: 'América do Sul',
      river: 'Rio Amazonas',
      mountain: 'Aconcágua',
      landmarks: 'Machu Picchu, Ilhas Galápagos'
    },
    'europe': {
      continent: 'Europa',
      river: 'Rio Danúbio',
      mountain: 'Mont Blanc',
      landmarks: 'Torre Eiffel, Coliseu, Acrópole de Atenas'
    },
    'africa': {
      continent: 'África',
      river: 'Rio Nilo',
      mountain: 'Monte Kilimanjaro',
      landmarks: 'Esfinge, Montanha da Mesa'
    },
    'asia': {
      continent: 'Ásia',
      river: 'Rio Yangtzé',
      mountain: 'Monte Everest',
      landmarks: 'Muralha da China, Petra'
    },
    'australia-and-oceania': {
      continent: 'Austrália e Oceania',
      river: 'Rio Murray',
      mountain: 'Monte Kosciuszko',
      landmarks: 'Ópera de Sydney, Grande Barreira de Corais, Uluru'
    }
  };

  function displayContinentInfo(continentId) {
    const info = continentInfo[continentId];
    if (info) {
      alert(`Continente: ${info.continent}\nRio: ${info.river}\nMontanha: ${info.mountain}\nPontos turísticos: ${info.landmarks}`);
    } else {
      alert('Informações não disponíveis');
    }
  }

  document.querySelectorAll('area').forEach(area => {
    area.addEventListener('click', function() {
      const continentId = this.id;
      displayContinentInfo(continentId);
    });
    area.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const continentId = this.id;
        displayContinentInfo(continentId);
      }
    });
  });

  const discoverLocationButton = document.getElementById('discoverLocation');
  
  discoverLocationButton.addEventListener('click', () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const continentId = determineContinentByGeo(latitude, longitude);
        displayContinentInfo(continentId);
      }, (error) => {
  alert("Erro ao obter a localização: " + error.message);
      });
    } else {
  alert("Geolocalização não é suportada pelo seu navegador.");
    }
  });

  function determineContinentByGeo(latitude, longitude) {
    if (latitude > 35 && longitude > -10 && longitude < 40) {
      return 'europe';
    } else if (latitude < 0 && longitude > -80 && longitude < -34) {
      return 'south-america';
    } else if (latitude > 0 && longitude > -130 && longitude < -70) {
      return 'north-america';
    } else if (latitude > 5 && latitude < 60 && longitude > 40 && longitude < 180) {
      return 'asia';
    } else if (latitude > -35 && latitude < 35 && longitude > 10 && longitude < 50) {
      return 'africa';
    } else if (latitude < -10 && longitude > 110 && longitude < 180) {
      return 'australia-and-oceania';
    }
  alert("Não foi possível determinar o continente com base na sua localização.");
    return null; 
  }
});
