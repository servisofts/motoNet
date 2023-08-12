import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SDate, SHr, SList, SLoad, SPage, SText, STheme, SView, STextProps } from 'servisofts-component';
import Container from '../Components/Container';
import Header from '../Components/Header';
import Model from '../Model';

class condiciones extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    contenido() {
        let propsText: STextProps = {
            font: 'Roboto', fontSize: 15, color: STheme.color.darkGray, justify: true,
        }
        return <>
            <SView col={'xs-12'} flex>
                <SText font='Roboto-Bold' fontSize={15} >1. INTRODUCCIÓN</SText>
                <SHr height={10} />
                <SText {...propsText}>
                    “TAPEKE S.R.L”, sociedad legalmente constituida en el Estado Plurinacional de Bolivia, con arreglo al Código de Comercio, debidamente inscrita en el Servicio Plurinacional del Registro de Comercio de Bolivia (SEPREC), bajo la Matrícula de Comercio Nro. 436653029, con Número de Identificación Tributaria (NIT) 436653029, emitida por el Servicio de Impuestos Nacionales (SIN); pone a disposición de sus usuarios la Plataforma denominada “TAPEKE” (en adelante, denominada “TAPEKE”), bajo los siguientes términos y condiciones:
                </SText>
                <SHr height={20} />

                <SText font='Roboto-Bold' fontSize={15} >2.	ALCANCE</SText>
                <SHr height={10} />
                <SText {...propsText}>
                    Cualquier servicio actual o futuro de TAPEKE estará sujeto a los lineamientos y condiciones aplicables a tal Servicio o negocio.
                </SText>
                <SHr height={10} />
                <SText {...propsText}>
                    Cualquier usuario puede acceder y utilizar nuestra Plataforma “TAPEKE”, sujetándose a estos términos y condiciones, junto con todas las demás políticas y principios que rigen en TAPEKE y que son incorporados al presente por referencia o están disponibles en nuestra página web o en nuestras cuentas oficiales de redes sociales o en cualquier otro medio de comunicación oficial.
                </SText>
                <SHr height={10} />
                <SText {...propsText}>
                    El desconocimiento del contenido de los términos y condiciones no justifica el incumplimiento de estos, y mucho menos, faculta a los Usuarios para tomar medidas particulares o legales que desconozcan lo planteado en estos términos y condiciones.
                </SText>
                <SHr height={10} />
                <SText {...propsText}>
                    A partir de su registro, los Usuarios reconocen y declaran su aceptación, expresa e irrevocable a los términos y condiciones, y se comprometen y obligan a su fiel y estricto cumplimiento.
                </SText>
                <SText {...propsText}>
                    TAPEKE se reserva el derecho, unilateralmente, a negar a prestar el servicio, cerrar cuentas o eliminar o editar contenido a su entera discreción, sin necesidad de invocar causa ni justificación alguna. CUALQUIER PERSONA QUE NO ACEPTE ESTOS TÉRMINOS Y CONDICIONES GENERALES, POLÍTICA DE PRIVACIDAD Y/O CUALQUIERA DE LAS DEMÁS POLÍTICAS, TÉRMINOS Y CONDICIONES PARTICULARES Y PRINCIPIOS QUE RIGEN EN TAPEKE, DEBERÁN ABSTENERSE DE UTILIZAR EL PLATAFORMA Y/O LOS SERVICIOS. Si los Usuarios tienen dudas respecto a estos Términos y Condiciones pueden comunicarse con nuestro equipo de Atención al Cliente.
                </SText>
                <SHr height={20} />

                <SText font='Roboto-Bold' fontSize={15} >3.	 PROPIEDAD INTELECTUAL</SText>
                <SHr height={10} />
                <SText {...propsText}>
                    El contenido de la Plataforma, incluyendo, pero sin limitarse a los textos, gráficas, imágenes, logotipos, íconos, software y cualquier otro material, -al cual en adelante se hará referencia como el "Material”-, está protegido bajo las leyes aplicables de propiedad industrial y propiedad intelectual. Todo el Material es de propiedad de TAPEKE o de sus proveedores. Queda prohibido modificar, copiar, reutilizar, extraer, explotar, reproducir, comunicar al público, hacer segundas o posteriores publicaciones, cargar o descargar archivos, enviar por correo, transmitir, usar, tratar o distribuir de cualquier forma la totalidad o parte de los contenidos incluidos en el Plataforma. El uso no autorizado del Material puede constituir una violación de las leyes sobre derechos de autor, leyes de propiedad industrial u otras leyes aplicables. Ningún Usuario podrá vender o modificar el Material de manera alguna, ni ejecutar o anunciar públicamente el Material, ni distribuirlo para propósitos comerciales. Tampoco se permitirá copiar o adaptar el código HTML que TAPEKE crea para generar su página web o plataforma, ya que el mismo está protegido por los derechos de autor. Todo uso no autorizado se presumirá como indebido y podrá ser sancionado por la ley.
                </SText>
                <SHr height={20} />

                <SText font='Roboto-Bold' fontSize={15} >4.	MARCAS COMERCIALES</SText>
                <SHr height={10} />
                <SText {...propsText}>
                    TAPEKE, el logotipo de TAPEKE, y otras marcas indicadas en el Plataforma son marcas comerciales de TAPEKE. Otros gráficos, logotipos, encabezados de página, íconos de botones, guiones y nombres de servicio de TAPEKE son marcas o imágenes comerciales de TAPEKE. Las marcas e imagen comerciales de TAPEKE no podrán ser utilizadas en relación con cualquier producto o servicio que no sea de TAPEKE, en su caso, de ninguna manera que pueda causar confusión entre los Usuarios o que desestime o desacredite a TAPEKE.
                </SText>
                <SHr height={20} />

                <SText font='Roboto-Bold' fontSize={15} >5.	USO AUTORIZADO DE LA PLATAFORMA</SText>
                <SHr height={10} />
                <SText {...propsText}>
                    La Plataforma tiene como fin principal la intermediación entre Usuarios y Oferentes para realizar Pedidos en las ciudades de Bolivia que posean el servicio, facilitando las relaciones y transacciones entre Usuarios y Oferentes adheridos al Plataforma.
                </SText>
                <SHr height={10} />
                <SText {...propsText}>
                    Asimismo, mediante la Plataforma, los Usuarios podrán contratar Servicios, realizando Pedidos, según los términos y condiciones aplicables, publicados en el Plataforma.
                </SText>
                <SHr height={10} />
                <SText {...propsText}>
                    TAPEKE contacta al Oferente, redirecciona el pedido, se encarga de informar respecto de su disponibilidad o no al Usuario de conformidad con la información que le haya proporcionado el Oferente. A través de la Plataforma se centralizan y otorgan a los Usuarios, todas las herramientas necesarias para que éste realice un Pedido. TAPEKE siempre hará su mejor esfuerzo para que una vez que el pedido haya sido confirmado por parte del Comercio al cual ha sido solicitado, el Comercio entregue el pedido de acuerdo con las especificaciones contratadas.
                </SText>
                <SHr height={20} />

                <SText font='Roboto-Bold' fontSize={15} >6.	INGRESO Y CREACIÓN DE CUENTA EN LA PLATAFORMA</SText>
                <SHr height={10} />
                <SText {...propsText}>
                    Para el uso de la Plataforma, los Usuarios deberán crear una cuenta de usuario (la “Cuenta”) donde se le solicitarán ciertos datos tales como: nombre, fecha de nacimiento, dirección, teléfono, correo electrónico, documento de identidad, identificación fiscal, y datos para procesar los pagos online (los “Datos”). Los Usuarios garantizan y responden, en cualquier caso, por la veracidad, exactitud, vigencia, autenticidad y actualización de sus Datos. En ningún caso TAPEKE se responsabiliza por la certeza de los Datos registrados por los Usuarios. Si los Usuarios tienen cuenta en Facebook, podrán crear su Cuenta con la utilización de las credenciales allí registradas. TAPEKE podrá requerir información o documentación adicional a los efectos de comprobar o corroborar los Datos, pudiendo suspender temporal o definitivamente a aquellos Usuarios cuyos Datos no hayan podido ser confirmados. Para acceder a su Cuenta personal, el Usuario deberá ingresar su correo electrónico y una contraseña la cual deberá mantener siempre de manera confidencial. Si el Usuario olvida su contraseña, podrá restablecerla haciendo clic en “Olvidé mi contraseña”. La Cuenta es única e intransferible. Queda prohibido que un Usuario registre o tenga más de una Cuenta. De detectarse el incumplimiento a lo antes previsto, TAPEKE se reserva el derecho de cancelar, suspender o inhabilitar las cuentas, sin perjuicio de otras medidas legales que pueda tomar. El Usuario es responsable del resguardo de sus datos de registro y contraseña, así como de todas las transacciones realizadas en su Cuenta, debiendo notificar a TAPEKE inmediatamente, de forma fehaciente, cualquier uso no autorizado de la misma, así como cualquier sustracción, divulgación o pérdida de sus datos de acceso al Plataforma. TAPEKE vela por la protección de los datos de los Usuarios. Sin embargo, no será responsable del uso fraudulento que puedan hacer terceros de la Cuenta del Usuario, incluidos usos indebidos de sus datos asociados a los pagos online. TAPEKE se reserva el derecho de rechazar cualquier solicitud de registro o de cancelar una registración previamente aceptada, sin que esté obligada a comunicar o exponer las razones de su decisión y sin que ello genere algún derecho a indemnización o resarcimiento. Los Usuarios tienen la facultad de ejercer el derecho de acceso, en cualquier momento y sin restricciones, de sus datos personales. TAPEKE tiene la atribución de atender las denuncias y reclamos que se interpongan con relación al incumplimiento de las normas sobre protección de datos personales.
                </SText>
                <SHr height={20} />

                <SText font='Roboto-Bold' fontSize={15} >7. PROCEDIMIENTO DE PEDIDOS Y ACLARACIONES GENERALES</SText>
                <SHr height={10} />
                <SText {...propsText}>
                    TAPEKE ofrece una plataforma de intermediación en línea (el Plataforma) para que los Oferentes puedan ofrecer sus Bienes, y los Usuarios puedan adquirirlos y solicitar su entrega a domicilio. En ese marco, TAPEKE exhibe la información de los Bienes del Oferente según la información provista por este último, no responsabilizándose por la exactitud y/o veracidad de esta. El Usuario comprende y acepta que TAPEKE no produce, provee, vende, expende ni es agente, distribuidor, ni en general es ningún tipo de comercializador de los Bienes exhibidos; por lo anterior, la relación de compraventa está estructurada entre el Usuario y el Oferente. Asimismo, el Usuario reconoce que es el único responsable por la correcta consignación de las direcciones de entrega y recogida de los Pedidos, eximiendo de responsabilidad a TAPEKE y a los repartidores por cualquier error o negligencia. El Usuario podrá ver las diferentes opciones disponibles sin estar registrado. Sin embargo, para poder finalizar el Pedido, el Usuario debe estar registrado con su Cuenta y debe ingresar el domicilio de entrega. Una vez realizado lo anterior, el Usuario podrá ver las diferentes opciones de Oferentes, Bienes, ubicación de los Oferentes, etc.
                </SText>
                <SHr height={10} />
                <SText {...propsText}>
                    Cuando el Usuario ha definido a dónde y qué quiere pedir, debe ingresar al perfil del Oferente en el Plataforma y elegir el/los Bienes que desea adquirir. Una vez seleccionados, se pone a disposición del Usuario las características, condiciones y valor total del Pedido, según la información provista por el Oferente. El Usuario deberá validar el Pedido y seleccionar el método de pago elegido a través de los medios de pago disponibles en TAPEKE para cada Oferente. Seleccionada la forma de pago, el Usuario deberá confirmar el Pedido.
                </SText>
                <SHr height={10} />
                <SText {...propsText}>
                    Es importante aclarar que todo Usuario se compromete a pagar el precio del Pedido desde el momento en el que recibe la comunicación de confirmación del Pedido según se indica más abajo en estos Términos y Condiciones. Tras la recepción de dicha comunicación, el Usuario únicamente podrá abstenerse de realizar el pago si el Pedido es cancelado de forma correcta, según lo previsto en estos Términos y Condiciones. Si el Usuario no recibe el Pedido en el domicilio indicado para ello y/o si surge algún contratiempo en donde no se verifiquen los datos del Usuario y se rechace el pedido una vez fue confirmado por el Plataforma y en ese sentido no se reciban correcciones una vez efectuada la confirmación, toda la responsabilidad recaerá sobre el Usuario y éste deberá indemnizar al Plataforma haciéndose cargo de todos los costos que generó el error en la transacción, a modo de ejemplo, el costo de envío que pudiera aplicar. Todos los Pedidos que se realizan a través del Plataforma son transmitidos a los Oferentes, quienes podrán contactarse con el Usuario, a modo de ejemplo, si los productos o servicios que integran el Pedido no se encuentran disponibles. Cuando el Oferente acepta o rechaza el Pedido, se comunica al Usuario con un correo electrónico, una notificación PUSH (emergente) u otro medio de comunicación, en donde se rechaza o confirma la recepción del Pedido, el cual se produce de forma automática con los detalles. En caso de rechazarse el Pedido por parte del Oferente, TAPEKE notificará al Usuario sin la obligación de notificar los motivos del rechazo. En caso de confirmarse el pedido, la PUSH (emergente) u otro medio de comunicación, indicará el tiempo de entrega del Pedido. Dicho tiempo de entrega es exclusivamente estimativo, y el Usuario reconoce que el mismo podrá sufrir pequeños ajustes mientras el Pedido se prepara (dichos ajustes se verán reflejados en el estado del pedido que se visualiza en el Plataforma). El Usuario, al hacer su Pedido, afirma conocer y aceptar que innumerables factores como el tráfico, el clima, los horarios pico y la capacidad de preparación del pedido y entrega de algunos Oferentes, pueden ser limitantes para asegurar la hora de entrega. Durante el tiempo que transcurra entre la confirmación del Pedido y la efectiva entrega de este, el Usuario podrá comunicarse en cualquier momento con TAPEKE a efectos de hacer preguntas, presentar quejas, entre otros, casos en los cuales siempre recibirá una respuesta en el menor tiempo posible. El Usuario podrá cancelar el Pedido una vez transcurrido el plazo de entrega indicado en la confirmación del pedido. TAPEKE siempre actuará como intermediaria y centrará sus esfuerzos en resolver todas las quejas o situaciones problemáticas que se configuren con ocasión a demoras, pedidos incompletos o equivocados, etc. En todos los casos, sin excepción, las quejas deben ser presentadas en un lenguaje decente y respetuoso, atendiendo a los presupuestos mínimos de cortesía y educación. Caso contrario, el Plataforma no estará obligado a proporcionar respuesta alguna, y, por el contrario, de acuerdo con su propio criterio, podrá proceder a bloquear al Usuario de su base de datos, quedando dicho Usuario imposibilitado para utilizar los Servicios nuevamente. Todos los comentarios y calificaciones son revisados por el personal de TAPEKE y son debidamente registrados en el historial de cada Usuario según la guía de comentarios disponible. La entrega del Pedido podrá realizarse con repartidores del Oferente u otros puestos a disposición por TAPEKE, según se indica en el Plataforma. El Usuario comprende y acepta que TAPEKE no se hará responsable ante el Usuario por la falta de entrega del Pedido o en caso de que se viera alterado o perjudicado - en caso de que el Oferente se encargue de este servicio. TAPEKE podrá otorgar a los Usuarios la opción de retirar el Pedido en determinados establecimientos de los Oferentes, esta opción se verá reflejada automáticamente a través del Plataforma al momento de realizar el Pedido (“Pick Up”). Ante este caso no se generará costos de envío.
                </SText>
                <SHr height={20} />

                <SText font='Roboto-Bold' fontSize={15} >8.	PRECIO DE LOS BIENES Y CARGOS</SText>
                <SHr height={10} />
                <SText {...propsText}>
                    El precio de los Bienes será presentado en la Plataforma, según la información provista por el Oferente, antes de que la transacción sea aceptada por el Usuario. Dicho precio incluirá todos los posibles recargos por impuestos, adiciones, etc., que sean aplicables a cada transacción. Se aclara que algunos Oferentes pueden tener importe mínimo de pedido y que también pueden aplicar costos de envío, lo que se indicará en los perfiles de los Oferentes. El Usuario comprende y acepta que, en caso de solicitar modificaciones a los Bienes integrantes del Pedido, el precio podrá tener modificaciones. Es responsabilidad del Usuario asegurarse en el momento de la entrega del Pedido, que éste corresponde con los Bienes solicitados y que todo lo recibido sea correcto. En caso contrario, el Usuario puede rechazar el pedido devolviéndoselo al repartidor. El Usuario acepta que el uso del Servicio puede implicar cargos por los Servicios o Bienes que se generen por los Oferentes y/o por los servicios de intermediación u otros costos operacionales que puedan generarse por TAPEKE, según corresponda (los “Cargos”). TAPEKE se reserva el derecho de agregar, modificar o eliminar los Cargos en cualquier momento durante la vigencia de estos Términos y Condiciones, lo cual el Usuario verá reflejado automáticamente al momento de realizar el Pedido a través del Plataforma. Asimismo, el Usuario entiende y acepta, al momento de realizar el Pedido, que los Oferentes y/o TAPEKE se reservan el derecho de incrementar los precios de los bienes que exhiben a través del Plataforma o de cobrar Cargos, los cuales serán debidamente informados a través del Plataforma previo al pago del Pedido por parte del Usuario.
                </SText>
                <SHr height={20} />

                <SText font='Roboto-Bold' fontSize={15} >9.	MODALIDADES DE PAGO</SText>
                <SHr height={10} />
                <SText {...propsText}>
                    Los métodos de pago para cada Pedido dependen de cada Oferente, por lo que el Usuario podrá verificar esta información en sus respectivos perfiles.
                </SText>
                <SHr height={10} />
                <SText {...propsText}>
                    1. Pago en la entrega en efectivo El Usuario podrá abonar el Pedido al repartidor en efectivo en moneda de curso legal en el país. Asimismo, el Usuario podrá indicar el monto exacto con el que abonará el Pedido, de manera que pueda establecerse si existe algún cargo en diferencia que deba retornarse al Usuario.
                </SText>
                <SHr height={10} />
                <SText {...propsText}>
                    2. Pago Online El Usuario podrá abonar el precio del Pedido mediante, por ejemplo, tarjeta de crédito, débito o cualquier otro medio de pago que se encuentra disponible a través del Plataforma. Cuando el Usuario elija realizar el pago online:
                </SText>
                <SHr height={10} />
                <SText {...propsText}>
                    (i) deberá cargar una tarjeta de crédito, débito o medios de pago electrónico para abonar el monto del Pedido. Esta información es gestionada de forma segura; sus datos no son almacenados en TAPEKE; o (ii) deberá seleccionar un medio de pago electrónico cargado previamente en el Plataforma. El Usuario deberá tener particular cuidado en el suministro de datos personales, los cuales deben ser completos y verídicos en el momento de realización del Pedido. Asimismo, al ingresar los datos el Usuario garantiza que (i) los datos que suministra de su medio de pago electrónico son de su propiedad y tiene suficientes fondos para hacer el pago, cuando éste sea el método de preferencia; y (ii) su identidad corresponde con la información contenida en la identificación oficial y original otorgada por las autoridades nacionales.
                </SText>
                <SHr height={10} />
                <SText {...propsText}>
                    El monto se descuenta al realizar el Pedido. Si posteriormente el Pedido es cancelado -ya sea por TAPEKE, por el Usuario o por el Oferente-, TAPEKE procesará la devolución al instante. Sin embargo, el reintegro depende de los tiempos estipulados en las políticas del emisor de cada medio de pago electrónico (por ej. de la tarjeta), sobre los cuales TAPEKE no tiene ninguna responsabilidad ni capacidad de modificar los tiempos que éstas devoluciones le insuman, resultando suficiente medio de prueba del actuar diligente de TAPEKE y por lo tanto, exonerándolo de responsabilidad, la acreditación a través de documentación de procesamiento de pagos, de la solicitud de devolución de las sumas por TAPEKE a las empresas de procesamiento de pagos y empresas emisoras de tarjetas, según corresponda. Si las devoluciones mencionadas no pueden ejecutarse por factores asociados a las emisoras de los medios de pago electrónicos, el importe será acreditado mediante un Cupón en la cuenta del Usuario y se le notificará sobre dicho crédito. Las transacciones online podrán ser rechazadas, cuando la validación y aceptación del pago no sea confirmada o aceptada por TAPEKE o cuando la entidad bancaria del Usuario o el medio de pago así lo determinen. TAPEKE, no se hace responsable por los trámites internos de autorización que disponga la entidad bancaria/financiera que emita los instrumentos de pago, ni por lo permisos que requieren los medios de pago para efectuar compras por internet. En el detalle de la transacción el Usuario podrá verificar la información completa de pago. Si el Usuario abonó el pedido con Pago Online y el pago fue confirmado, no deberá realizar otro pago por el Pedido, salvo que hubiera realizado modificaciones al Pedido según se indica en estos Términos y Condiciones.
                </SText>
                <SHr height={20} />

                <SText font='Roboto-Bold' fontSize={15} >10. PUBLICIDAD</SText>
                <SHr height={10} />
                <SText {...propsText}>
                    TAPEKE cuenta con un servicio de publicidad por medio del cual ésta se hace llegar a los Usuarios a través de banderas (banners), correos electrónicos y/u otros medios. Los enlaces o vínculos que dirigen a otros sitios web de propiedad de terceras personas se suministran para su conveniencia únicamente y TAPEKE no respalda, recomienda o asume responsabilidad alguna sobre el contenido de estos. El Usuario puede solicitar no recibir más correos electrónicos u otras notificaciones relativas a publicidad mediante la configuración del perfil de su cuenta.
                </SText>
                <SHr height={20} />

                <SText font='Roboto-Bold' fontSize={15} >11. PROHIBICIÓN DE REVENTA, CESIÓN O USO COMERCIAL NO AUTORIZADO</SText>
                <SHr height={10} />
                <SText {...propsText}>
                    Los Usuarios acuerdan no revender o ceder sus derechos u obligaciones al aceptar estos Términos y Condiciones. También se comprometen a no hacer un uso comercial no autorizado de la Plataforma. 1
                </SText>
                <SHr height={20} />

                <SText font='Roboto-Bold' fontSize={15} >12. DERECHO A SUSPENDER O CANCELAR LA CUENTA</SText>
                <SHr height={10} />
                <SText {...propsText}>
                    TAPEKE de forma unilateral, se reserva el derecho a suspender o cancelar la cuenta o el registro del Usuario, ante el incumplimiento de éste a los Términos y Condiciones.
                </SText>
                <SHr height={20} />

                <SText font='Roboto-Bold' fontSize={15} >13. INTERRUPCIÓN DEL SERVICIO, Y LIBERACIÓN DE RESPONSABILIDAD</SText>
                <SHr height={10} />
                <SText {...propsText}>
                    TAPEKE NO GARANTIZA QUE LA PLATAFORMA OPERE LIBRE DE ERRORES O QUE SU SERVIDOR SE ENCUENTRE LIBRE DE VIRUS DE COMPUTADORES U OTROS MECANISMOS DAÑINOS. SI EL USO DE LA PLATAFORMA O DEL MATERIAL RESULTA EN LA NECESIDAD DE SOLICITAR SERVICIO DE REPARACIÓN O MANTENIMIENTO A SUS EQUIPOS O INFORMACIÓN O DE REEMPLAZAR SUS EQUIPOS O INFORMACIÓN, TAPEKE NO ES RESPONSABLE POR LOS COSTOS QUE ELLO IMPLIQUE. LA PLATAFORMA Y EL MATERIAL SE PONEN A DISPOSICIÓN DE LOS USUARIOS EN EL ESTADO EN QUE SE ENCUENTREN. NO SE OTORGA GARANTÍA ALGUNA SOBRE LA EXACTITUD, CONFIABILIDAD U OPORTUNIDAD DEL MATERIAL, LOS SERVICIOS, LOS TEXTOS, EL SOFTWARE, LAS GRÁFICAS Y LOS ENLACES O VÍNCULOS. EN NINGÚN CASO, TAPEKE, SUS PROVEEDORES O CUALQUIER PERSONA MENCIONADA EN LA PLATAFORMA, SERÁ RESPONSABLE POR DAÑOS DE CUALQUIER NATURALEZA, RESULTANTES DEL USO O LA IMPOSIBILIDAD DE USARLOS.
                </SText>
                <SHr height={10} />
                <SView col={'xs-12'} >
                    <SText {...propsText}>
                        De la misma forma, TAPEKE NO GARANTIZA EL ACCESO Y USO CONTINUADO O ININTERRUMPIDO DE LA PLATAFORMA. LA PLATAFORMA PUEDE EVENTUALMENTE NO ESTAR DISPONIBLE DEBIDO A DIFICULTADES TÉCNICAS O FALLAS DE INTERNET O CUALQUIER CIRCUNSTANCIA AJENA, O PROPIAS, A TAPEKE. EN TALES CASOS, SE PROCURARÁ RESTABLECERLO CON LA MAYOR CELERIDAD POSIBLE, SIN QUE POR ELLO PUEDA IMPUTÁRSELE ALGÚN TIPO DE RESPONSABILIDAD. TAMPOCO ASUME RESPONSABILIDAD ALGUNA, EN CASO DE QUE EL COMERCIO O EL RESTURANTE, MANDEN AL USUARIO ALGÚN PRODUCTO VENCIDO.
                    </SText>
                </SView>
                <SHr height={20} />

                <SText font='Roboto-Bold' fontSize={15} >14. LEGISLACIÓN APLICABLE</SText>
                <SHr height={10} />
                <SText {...propsText}>
                    Los usuarios de TAPEKE, aceptan y reconocen que las leyes y reglamentos del Estado Plurinacional de Bolivia, deberán ser el marco jurídico aplicable en caso de producirse alguna disputa, discrepancia o conflicto, así como también deberá acatarse y cumplirse los Términos y Condiciones expresados en el presente documento.
                </SText>
                <SHr height={20} />

            </SView>
        </>
    }

    render() {

        return (
            <SPage title={'Términos y condiciones'}
            header={<Header/>}
            >
                <SHr />
                <Container>
                    <SHr height={20} />
                    <SText font='Roboto-Bold' fontSize={18}>TAPEKE S.R.L</SText>
                    <SHr height={15} />
                    <SText font='Roboto-Bold' fontSize={15} style={{ textDecorationLine: "underline" }}>TÉRMINOS Y CONDICIONES </SText>
                    <SHr height={25} />
                    {this.contenido()}
                    <SHr height={25} />
                </Container>

            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(condiciones);