import LegalLayout, { LegalSection } from "@/components/LegalLayout";

const Privacidade = () => {
  return (
    <LegalLayout
      title="Política de Privacidade"
      description="Política de Privacidade do site de Augusto Dantas — que dados recolhemos, como os usamos e os seus direitos ao abrigo do RGPD."
      path="/privacidade"
      lastUpdated="25 de maio de 2026"
    >
      <p>
        A presente Política de Privacidade descreve como são tratados os dados pessoais dos
        visitantes do site <strong>dantasdev.pt</strong> (o "Site"), explorado por Augusto Dantas,
        com sede em Leiria, Portugal. O tratamento é realizado em conformidade com o Regulamento
        Geral sobre a Proteção de Dados (RGPD — Regulamento (UE) 2016/679).
      </p>

      <LegalSection title="1. Responsável pelo tratamento">
        <p>
          O responsável pelo tratamento dos dados é Augusto Dantas. Para qualquer questão
          relacionada com privacidade, pode contactar através do email{" "}
          <a href="mailto:daantadev@gmail.com">daantadev@gmail.com</a>.
        </p>
      </LegalSection>

      <LegalSection title="2. Dados que recolhemos">
        <p>Podemos recolher e tratar as seguintes categorias de dados:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            <strong>Dados de contacto:</strong> nome, email e mensagem que nos envia voluntariamente
            através do formulário de contacto.
          </li>
          <li>
            <strong>Dados de navegação:</strong> endereço IP, tipo de navegador, páginas visitadas e
            duração da visita, recolhidos de forma agregada para fins estatísticos.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="3. Finalidades e base legal">
        <p>Os dados são tratados para as seguintes finalidades:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Responder a pedidos de contacto e propostas de trabalho (execução de diligências pré-contratuais).</li>
          <li>Melhorar o desempenho e a experiência do Site (interesse legítimo).</li>
          <li>Cumprir obrigações legais aplicáveis.</li>
        </ul>
        <p>
          O tratamento de dados de análise de tráfego depende do seu consentimento, que pode dar ou
          recusar através do aviso de cookies.
        </p>
      </LegalSection>

      <LegalSection title="4. Cookies e tecnologias semelhantes">
        <p>
          O Site utiliza cookies essenciais ao seu funcionamento e cookies de análise para
          compreender como os visitantes interagem com as páginas. Pode aceitar ou rejeitar os
          cookies não essenciais através do aviso apresentado na sua primeira visita. A recusa não
          impede a utilização do Site.
        </p>
        <p>
          Pode, a qualquer momento, eliminar os cookies através das definições do seu navegador.
        </p>
      </LegalSection>

      <LegalSection title="5. Partilha com terceiros">
        <p>
          Não vendemos os seus dados pessoais. Alguns dados podem ser tratados por prestadores de
          serviços que nos apoiam no funcionamento do Site, nomeadamente serviços de alojamento e de
          análise de tráfego, sempre sujeitos a obrigações de confidencialidade e de proteção de
          dados.
        </p>
      </LegalSection>

      <LegalSection title="6. Conservação dos dados">
        <p>
          Os dados de contacto são conservados apenas durante o período necessário para responder ao
          seu pedido e para a eventual relação comercial subsequente. Os dados de navegação são
          conservados de forma agregada por períodos limitados.
        </p>
      </LegalSection>

      <LegalSection title="7. Os seus direitos">
        <p>
          Ao abrigo do RGPD, tem direito a aceder, retificar, apagar, limitar ou opor-se ao
          tratamento dos seus dados, bem como à portabilidade dos mesmos. Pode exercer estes direitos
          contactando <a href="mailto:daantadev@gmail.com">daantadev@gmail.com</a>. Tem ainda o
          direito de apresentar reclamação junto da Comissão Nacional de Proteção de Dados (CNPD).
        </p>
      </LegalSection>

      <LegalSection title="8. Alterações a esta política">
        <p>
          Esta Política de Privacidade pode ser atualizada periodicamente. A data da última
          atualização encontra-se no topo desta página.
        </p>
      </LegalSection>
    </LegalLayout>
  );
};

export default Privacidade;
