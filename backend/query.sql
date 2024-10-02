CREATE DATABASE meioambiente;
USE meioambiente;

CREATE TABLE arvores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    nomeCientifico VARCHAR(150) NOT NULL,
    descricao TEXT,
    latitude DECIMAL(9, 6),
    longitude DECIMAL(9, 6),
    imagem VARCHAR(255)
);

INSERT INTO arvores (nome, nomeCientifico, descricao, latitude, longitude, imagem) VALUES
('Ipê Amarelo', 'Handroanthus albus', 'Árvore nativa do Brasil, conhecida por suas flores amarelas vibrantes.', -15.794229, -47.882166, 'https://www.globaltree.com.br/uploads/1/1/7/7/11773298/7886072_orig.jpg'),
('Cambuí', 'Myrcia multiflora', 'Árvore frutífera nativa, com folhas verdes e frutos pequenos.', -23.550520, -46.633308, 'https://cuidandodeplantas.com.br/wp-content/uploads/2023/10/Cambui-Arvore.webp'),
('Pau-Brasil', 'Paubrasilia echinata', 'Árvore símbolo do Brasil, famosa por sua madeira densa e cor avermelhada.', -22.906847, -43.172896, 'https://cdn.univicosa.com.br/img/portal/noticia/acervo/91408paubrasilCeplag.jpg');