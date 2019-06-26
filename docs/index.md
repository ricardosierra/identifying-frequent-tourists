https://www.youtube.com/watch?v=u99tNt3TZf8

Olá Ricardo, tudo bem?

Agora que já nos conhecemos, queremos ver você com a mão na massa!

Temos um desafio pra você! Queremos ter uma ideia dos seus conhecimentos e habilidades. Você tem até o dia 25/06/2019 para fazê-lo. ;)

Nosso objetivo é medir o quanto você conhece sobre a tecnologia que utilizamos, e a sua habilidade para planejar soluções.

Vamos nessa?

Imagine que você trabalha para uma empresa federal de segurança que monitora os passageiros de companhias aéreas.

Eles estão desenvolvendo um sistema para identificação de passageiros suspeitos nos vôos.

Para isso, os funcionários das companhias aéreas vão cadastrar os vôos, os passageiros e os bilhetes na sua plataforma. Você precisa controlar - permitindo a criação, visualização e exclusão - as seguintes entidades:

    Flight

    Todos os vôos cadastrados. Eles tem informações como:
        Number (unique)
        Origin
        Destination
        DepartureTime
        ArrivalTime
    Passenger

    Todos os passageiros que já foram cadastrados pelos usuários do seu site. Eles tem informações como:
        Name
        NationalID (unique)
        Gender (Male/Female)
    Ticket

    Todos os bilhetes aéreos vendidos, que garantem a presença dos passageiros nos vôos. Eles tem informações como:
        PassengerNationalID
        FlightNumber
        SeatNumber

Além disso, você precisa criar, em uma nova seção do site, uma consulta especial que mostra uma lista de passageiros suspeitos, que devem ter suas bagagens vistoriadas no próximo embarque.

QUEM SÃO OS PASSAGEIROS SUSPEITOS? São aqueles possuem bilhetes de ida e volta em um mesmo dia, mais de 3 vezes nos últimos 30 dias.

A segurança do país está em suas mãos!

Você deve usar a biblioteca JSON Server para ser o seu backend, mas sem precisar desenvolver um. A ideia é que você seja capaz de persistir os dados das 3 entidades que precisa controlar no formato JSON, utilizando essa ferramenta.

Precisamos que você construa a sua solução, utilizando o framework ReactJS. Seria interessante se utilizasse também a biblioteca Redux para controle de estado global.

Sugerimos que crie um repositório no GitHub onde você vai disponibilizar o código da sua aplicação, e que nos envie o link assim que possível, para podermos acompanhar a evolução do projeto.

Sinta-se a vontade para interagir com o nosso time para encontrar a solução, afinal, queremos construir algo juntos, certo?

Estamos ansiosos para ver o que você vai preparar para nós!

Até breve!

Equipe JuryVox
