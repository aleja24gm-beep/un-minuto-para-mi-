import { ExerciseStep, HospitalRole, TensionZone, WellnessPrescription, ShiftType } from '../types';

export const ALL_EXERCISES: ExerciseStep[] = [
  // --- DESCANSO VISUAL ---
  {
    id: 'vis_202020',
    title: 'Regla 20-20-20 Ocular',
    subtitle: 'Enfoque al infinito para relajar el músculo ciliar',
    category: 'visual',
    durationSeconds: 30,
    anatomicalTarget: 'Músculos ciliares y convergencia ocular',
    hospitalContext: 'Crucial tras revisar historias clínicas en computadoras, monitores de signos vitales o imágenes diagnósticas.',
    instructions: [
      'Aparta la mirada de cualquier pantalla, monitor o luz directa.',
      'Dirige tus ojos a un punto lejano (al menos a 6 metros o hacia una ventana).',
      'Parpadea despacio y siente cómo tus ojos liberan la tensión del enfoque cercano.',
      'Mantén la vista relajada sin forzar el detalle durante los 20-30 segundos.'
    ],
    tips: 'Si estás en una sala sin ventanas, mira al rincón más distante del pasillo o estación.'
  },
  {
    id: 'vis_palming',
    title: 'Palming Térmico Hospitalario',
    subtitle: 'Oscuridad total y calor reparador con las palmas limpias',
    category: 'visual',
    durationSeconds: 45,
    anatomicalTarget: 'Fotorreceptores retinianos y párpados',
    hospitalContext: 'Alivia la fotofobia provocada por luces LED/fluorescentes de alta intensidad de quirófanos y salas de emergencias.',
    instructions: [
      'Asegúrate de que tus manos estén higienizadas y secas.',
      'Frota enérgicamente las palmas de tus manos durante 10 segundos hasta generar calor.',
      'Forma dos cuencos suaves con las manos y colócalas sobre tus ojos cerrados, sin presionar los globos oculares.',
      'Siente la oscuridad profunda y el calor reconfortante. Inhala profundamente.',
      'Permite que la retina descanse de los estímulos lumínicos constantes.'
    ],
    tips: 'Apoya los codos en el mesón o escritorio si es posible para relajar hombros a la vez.'
  },
  {
    id: 'vis_gimnasia',
    title: 'Gimnasia Sacádica y Lubricación',
    subtitle: 'Movimientos oculares en 8 direcciones y parpadeo consciente',
    category: 'visual',
    durationSeconds: 40,
    anatomicalTarget: 'Músculos rectos y oblicuos oculares, glándulas de Meibomio',
    hospitalContext: 'El aire acondicionado hospitalario y la fijación visual reducen el parpadeo en un 60%, causando ojo seco.',
    instructions: [
      'Mantén la cabeza fija y mira lentamente hacia arriba al techo, luego abajo al suelo.',
      'Mira hacia el extremo derecho, luego hacia el extremo izquierdo.',
      'Realiza un círculo amplio y suave con la mirada en sentido de las agujas del reloj.',
      'Cierra los ojos firmemente durante 2 segundos y abre despacio (parpadeo hidratante). Repite 3 veces.'
    ],
    tips: 'Haz los movimientos sin prisas; el objetivo es estirar la musculatura extrínseca del ojo.'
  },
  {
    id: 'vis_periorbital',
    title: 'Descompresión Periorbitaria',
    subtitle: 'Drenaje suave de sienes, cejas y arco nasal',
    category: 'visual',
    durationSeconds: 35,
    anatomicalTarget: 'Nervio supraorbitario y fascia periorbitaria',
    hospitalContext: 'Disipa la cefalea tensional típica de turnos de noche o concentración microscópica.',
    instructions: [
      'Con la yema de los pulgares o dedos índices limpios, presiona suavemente el inicio de las cejas (cerca del tabique).',
      'Desliza los dedos con leve presión a lo largo del arco de las cejas hacia las sienes.',
      'Realiza pequeños círculos lentos en las sienes en sentido horario.',
      'Respira despacio mientras liberas la tensión acumulada en el entrecejo.'
    ],
    tips: 'Ideal para quienes usan gafas de protección o pantallas faciales durante procedimientos.'
  },

  // --- RELAJACIÓN Y NEURO-DESCOMPRESIÓN ---
  {
    id: 'rel_sigh',
    title: 'Suspiro Fisiológico Neuro-Vagal',
    subtitle: 'La técnica más rápida para calmar la respuesta de lucha o huida',
    category: 'relajacion',
    durationSeconds: 40,
    anatomicalTarget: 'Alvéolos pulmonares y estimulación del nervio vago',
    hospitalContext: 'Para resetear el sistema nervioso inmediatamente tras un código de emergencia o situación de estrés agudo.',
    instructions: [
      'Realiza una primera inhalación profunda por la nariz llenando los pulmones al 80%.',
      'Sin soltar el aire, añade una segunda inhalación corta por la nariz para expandir los alvéolos al máximo.',
      'Exhala muy despacio y de forma prolongada por la boca con los labios entreabiertos.',
      'Repite este ciclo 3 a 5 veces con calma.'
    ],
    tips: 'La exhalación debe durar al menos el doble que la inhalación para desacelerar el ritmo cardíaco.',
    breathingPattern: {
      inhale: 3,
      hold1: 1,
      exhale: 6,
      hold2: 1,
      label: 'Doble inhalación nasal rápida + Exhalación bucal lenta'
    }
  },
  {
    id: 'rel_box',
    title: 'Respiración en Caja (Box 4-4-4-4)',
    subtitle: 'Control autonómico para estabilizar pulso y claridad mental',
    category: 'relajacion',
    durationSeconds: 60,
    anatomicalTarget: 'Sistema nervioso parasimpático y diafragma',
    hospitalContext: 'Perfecta antes de entrar a quirófano, iniciar un pase de visita complejo o canalizar una vía difícil.',
    instructions: [
      'Inhala por la nariz contando mentalmente 4 segundos.',
      'Retén el aire con los pulmones llenos durante 4 segundos.',
      'Exhala suavemente por la nariz o boca durante 4 segundos.',
      'Sostén el vacío con los pulmones vacíos durante 4 segundos.',
      'Completa 3 a 4 ciclos fluidos sintiendo tus latidos calmarse.'
    ],
    tips: 'Mantén los hombros relajados hacia abajo mientras expandes la zona abdominal.',
    breathingPattern: {
      inhale: 4,
      hold1: 4,
      exhale: 4,
      hold2: 4,
      label: '4s Inhala · 4s Retén · 4s Exhala · 4s Sostén'
    }
  },
  {
    id: 'rel_mandibula_hombros',
    title: 'Liberación Mandibular y Escapular',
    subtitle: 'Desbloqueo del bruxismo de guardia y trapecios elevados',
    category: 'relajacion',
    durationSeconds: 45,
    anatomicalTarget: 'Músculos maseteros, temporal y trapecio superior',
    hospitalContext: 'El personal sanitario suele apretar la mandíbula involuntariamente durante guardias y situaciones críticas.',
    instructions: [
      'Abre la boca suavemente dejando caer la mandíbula inferior, separando los dientes posteriores.',
      'Lleva la punta de la lengua al paladar blando y relaja las mejillas.',
      'Inhala y eleva conscientemente los hombros hacia las orejas contrayéndolos 3 segundos.',
      'Exhala con un suspiro y deja caer los hombros completamente pesados. Siente el contraste.',
      'Repite 3 veces.'
    ],
    tips: 'Comprueba durante el turno que tu lengua no esté presionando contra los dientes.'
  },
  {
    id: 'rel_grounding',
    title: 'Anclaje Sensorial Hospitalario (Grounding)',
    subtitle: 'Retorno al presente para desconectar de la saturación de alarmas',
    category: 'relajacion',
    durationSeconds: 50,
    anatomicalTarget: 'Corteza prefrontal y regulación sensorial',
    hospitalContext: 'Para frenar el sobreestímulo de monitores continuos, timbres de pacientes y prisas del servicio.',
    instructions: [
      'Apoya firmemente ambos pies descalzos o con calzado en el suelo sintiendo el peso corporal.',
      'Nombra mentalmente 3 cosas estables que ves a tu alrededor.',
      'Reconoce 2 texturas físicas (la tela de tu uniforme, la superficie fría de tu escritorio).',
      'Escucha 1 sonido neutral sin juzgarlo (la brisa, tu propia respiración tranquila).',
      'Regálate una respiración consciente agradeciendo a tu cuerpo por su labor.'
    ],
    tips: 'Este anclaje desactiva el bucle de rumiación y fatiga compasiva.'
  },

  // --- PAUSAS ACTIVAS ERGONÓMICAS ---
  {
    id: 'act_bomba_gemelos',
    title: 'Bomba de Retorno Venoso en Gemelos',
    subtitle: 'Activación vascular para piernas pesadas tras horas de pie',
    category: 'pausa_activa',
    durationSeconds: 45,
    anatomicalTarget: 'Gastrocnemios, sóleo y bomba muscular venosa',
    hospitalContext: 'Esencial para enfermeros, camilleros y cirujanos que pasan más de 6-10 horas de pie en el turno.',
    instructions: [
      'Ponte de pie con los pies separados al ancho de las caderas (puedes apoyarte en una pared o mesa).',
      'Elévate lentamente sobre las puntas de los pies contrayendo las pantorrillas durante 2 segundos.',
      'Baja suavemente y eleva ligeramente las puntas de los pies apoyándote sobre los talones.',
      'Realiza 15 a 20 elevaciones continuas a ritmo cadencioso.',
      'Siente cómo la sangre acumulada en los miembros inferiores fluye de vuelta al corazón.'
    ],
    tips: 'Previene várices y reduce la sensación de pesadez y edema en los tobillos.'
  },
  {
    id: 'act_descompresion_lumbar',
    title: 'Descompresión Lumbar en Muro / Camilla',
    subtitle: 'Apertura de vértebras lumbares tras movilizar pacientes',
    category: 'pausa_activa',
    durationSeconds: 50,
    anatomicalTarget: 'Columna lumbar, cuadrado lumbar e isquiotibiales',
    hospitalContext: 'Alivia la sobrecarga de levantar camillas, trasladar enfermos o agacharse repetidamente.',
    instructions: [
      'Colócate frente a una pared, mesón o borde de camilla a un metro de distancia.',
      'Apoya las palmas a la altura del pecho o cadera y retrocede un par de pasos.',
      'Flexiona levemente las rodillas y baja el tronco dejando que el pecho caiga entre los brazos.',
      'Mantén la espalda recta formando un ángulo de 90 grados con las piernas.',
      'Siente la tracción suave que estira la columna lumbar y los hombros durante 20 segundos.',
      'Inhala profundo y sube redondeando la espalda vértebra por vértebra.'
    ],
    tips: 'No arquees la zona lumbar hacia abajo; mantén el ombligo ligeramente activado.'
  },
  {
    id: 'act_apertura_pectoral',
    title: 'Apertura Pectoral y Retracción Escapular',
    subtitle: 'Corrección de postura encorvada de quirófano y digitación',
    category: 'pausa_activa',
    durationSeconds: 45,
    anatomicalTarget: 'Pectoral mayor/menor, romboides y trapecio medio',
    hospitalContext: 'Contrarresta las horas pasadas encorvado sobre mesas de curaciones, bandejas quirúrgicas o computadoras.',
    instructions: [
      'De pie o sentado erguido, entrelaza los dedos de las manos detrás de la espalda a la altura de los glúteos.',
      'Rueda los hombros hacia atrás y hacia abajo juntando los omóplatos.',
      'Empuja suavemente las manos hacia abajo y levemente hacia atrás sin arquear la zona lumbar.',
      'Abre el pecho hacia adelante elevando suavemente la barbilla. Respira hondo 3 veces.',
      'Suelta lentamente sacudiendo los brazos con ligereza.'
    ],
    tips: 'Si no alcanzas a entrelazar las manos, apoya las manos en la cintura con los codos hacia atrás.'
  },
  {
    id: 'act_munecas_dedos',
    title: 'Descompresión de Muñecas, Túnel Carpiano y Dedos',
    subtitle: 'Alivio para uso de pipetas, guantes estériles y colocación de vías',
    category: 'pausa_activa',
    durationSeconds: 50,
    anatomicalTarget: 'Tendones flexores y extensores de los dedos, nervio mediano',
    hospitalContext: 'Imprescindible para instrumentistas quirúrgicos, laboratoristas, farmacéuticos y enfermería con micro-tareas manuales.',
    instructions: [
      'Extiende el brazo derecho hacia adelante a la altura del hombro con la palma mirando al frente (gesto de alto).',
      'Con la mano izquierda, toma suavemente los dedos y llévalos hacia atrás sintiendo el estiramiento en el antebrazo. Mantén 15s.',
      'Ahora apunta los dedos hacia el suelo con la palma hacia ti y presiona suavemente el dorso de la mano. Mantén 15s.',
      'Repite la misma secuencia con el brazo izquierdo.',
      'Finaliza abriendo y cerrando los puños rápidamente 10 veces en abanico y sacude las manos.'
    ],
    tips: 'Previene tendinitis de De Quervain y síndrome de túnel carpiano por microtrauma repetitivo.'
  },
  {
    id: 'act_chin_tuck',
    title: 'Retracción Cervical y Alivio de Cuello',
    subtitle: 'Alineación de columna cervical y descanso de trapecios',
    category: 'pausa_activa',
    durationSeconds: 40,
    anatomicalTarget: 'Flexores profundos del cuello, esplenio y esternocleidomastoideo',
    hospitalContext: 'Corrige la antepulsión de cabeza provocada por mirar hacia abajo a pacientes encamados o expedientes.',
    instructions: [
      'Mira al frente con la mirada horizontal.',
      'Lleva suavemente el mentón hacia atrás (como haciendo doble barbilla) sin bajar la cabeza ni inclinarla.',
      'Siente cómo se alarga la parte posterior del cuello. Mantén durante 5 segundos y relaja.',
      'Repite el movimiento de retracción 5 veces de forma suave.',
      'Luego inclina suavemente la oreja derecha hacia el hombro derecho sintiendo el estiramiento lateral. Repite al lado izquierdo.'
    ],
    tips: 'Evita rotaciones bruscas del cuello; los movimientos suaves protegen las carótidas y discos cervicales.'
  },
  {
    id: 'act_torsion_lumbar',
    title: 'Torsión Espinal Suave en Silla',
    subtitle: 'Movilidad articular para personal administrativo y de estación',
    category: 'pausa_activa',
    durationSeconds: 45,
    anatomicalTarget: 'Músculos rotadores de la columna y oblicuos',
    hospitalContext: 'Para personal que pasa horas sentado ingresando admisiones, pedidos de farmacia o informes médicos.',
    instructions: [
      'Siéntate con los pies apoyados planos en el suelo y la columna alargada.',
      'Coloca tu mano derecha en el respaldo de la silla o en el muslo exterior izquierdo.',
      'Inhala alargando la coronilla al techo, y al exhalar gira suavemente el torso hacia la izquierda desde la cintura.',
      'Mantén la torsión sin forzar durante 15 segundos respirando con calma.',
      'Regresa al centro despacio y repite hacia el lado derecho durante otros 15 segundos.'
    ],
    tips: 'El giro debe originarse en el tórax y costillas, no forzando el cuello.'
  }
];

/**
 * Generates an occupational wellness prescription customized for hospital staff
 */
export function generatePrescription(
  role: HospitalRole,
  tensionZone: TensionZone,
  fatigueLevel: number,
  targetDurationSeconds: number,
  shift: ShiftType
): WellnessPrescription {
  // Filter or prioritize based on tension zone and role
  const exercises: ExerciseStep[] = [];

  // Match main exercise for the chosen tension zone
  let primaryExerciseId = 'vis_202020';
  let secondaryCategory: 'visual' | 'relajacion' | 'pausa_activa' = 'relajacion';

  switch (tensionZone) {
    case 'Ojos y Cefalea':
      primaryExerciseId = fatigueLevel >= 7 ? 'vis_palming' : 'vis_202020';
      secondaryCategory = 'relajacion';
      break;
    case 'Cuello, Hombros y Trapecios':
      primaryExerciseId = 'act_chin_tuck';
      secondaryCategory = 'relajacion';
      break;
    case 'Espalda Baja y Lumbares':
      primaryExerciseId = 'act_descompresion_lumbar';
      secondaryCategory = 'pausa_activa';
      break;
    case 'Muñecas, Manos y Dedos':
      primaryExerciseId = 'act_munecas_dedos';
      secondaryCategory = 'relajacion';
      break;
    case 'Piernas Pesadas y Pies':
      primaryExerciseId = 'act_bomba_gemelos';
      secondaryCategory = 'relajacion';
      break;
    case 'Sobrecarga Mental y Estrés':
      primaryExerciseId = fatigueLevel >= 8 ? 'rel_sigh' : 'rel_box';
      secondaryCategory = 'visual';
      break;
  }

  const primary = ALL_EXERCISES.find(e => e.id === primaryExerciseId) || ALL_EXERCISES[0];
  exercises.push(primary);

  // If time is 120s or more, add complementary exercises
  if (targetDurationSeconds >= 120) {
    // Add relaxation or visual pause
    const secondary = ALL_EXERCISES.find(e => 
      e.category === secondaryCategory && e.id !== primary.id
    ) || ALL_EXERCISES[1];
    exercises.push(secondary);
  }

  if (targetDurationSeconds >= 180) {
    // Add third active break
    const tertiary = ALL_EXERCISES.find(e => 
      e.category === 'pausa_activa' && !exercises.some(ex => ex.id === e.id)
    ) || ALL_EXERCISES[4];
    exercises.push(tertiary);
  }

  if (targetDurationSeconds >= 300) {
    // Add 4th exercise for full decompression
    const quaternary = ALL_EXERCISES.find(e => 
      !exercises.some(ex => ex.id === e.id)
    ) || ALL_EXERCISES[5];
    exercises.push(quaternary);
  }

  // Adjust total duration and steps to fit requested target time gracefully
  const allocatedTime = Math.max(60, targetDurationSeconds);

  // Rationale generation
  const rationale = getRationaleForContext(role, tensionZone, fatigueLevel, shift);
  const clinicalTip = getClinicalTip(role, shift);

  return {
    id: `rx_${Date.now()}`,
    role,
    tensionZone,
    fatigueLevel,
    totalDurationSeconds: allocatedTime,
    shift,
    exercises,
    rationale,
    clinicalTip
  };
}

function getRationaleForContext(
  role: HospitalRole,
  zone: TensionZone,
  fatigue: number,
  shift: ShiftType
): string {
  if (fatigue >= 8) {
    return `Alerta de fatiga elevada detectada (${fatigue}/10) en ${shift}. La rutina prioriza regulación neurovegetativa inmediata para reducir el cortisol sérico y descomprimir la zona de ${zone.toLowerCase()}.`;
  }
  if (role === 'Enfermería y Cuidados' || role === 'Servicios Generales y Camilleros') {
    return `Rutina optimizada para ${role}: equilibra la descarga de bipedestación continua con oxigenación diafragmática para reanudar el cuidado de pacientes con menor fatiga física.`;
  }
  if (role === 'Medicina y Cirugía') {
    return `Prescripción enfocada en precisión y postura estática prolongada: libera la cadena muscular posterior y restaura la agudeza visual.`;
  }
  if (role === 'Radiología y Monitores' || role === 'Administración y Admisión') {
    return `Protocolo ergonómico contra el sedentarismo y la astenopia acomodativa provocada por monitores clínicos.`;
  }
  return `Prescripción equilibrada de 1 a 5 minutos para oxigenar tejidos, relajar la musculatura tensa y renovar la concentración en el servicio.`;
}

function getClinicalTip(role: HospitalRole, shift: ShiftType): string {
  const tips: Record<string, string> = {
    'Enfermería y Cuidados': 'Aprovecha cada pausa para hidratarte con 150 ml de agua fresca y revisar el apoyo de tus plantillas de calzado.',
    'Medicina y Cirugía': 'Tras retirar guantes y lavado clínico de manos, aplica estiramiento suave a los lumbricales antes de volver a escribir órdenes.',
    'Urgencias y Triage': 'Si sientes taquicardia por sobrecarga sensorial de sirenas y monitores, realiza 3 suspiros fisiológicos antes de triar al siguiente paciente.',
    'Laboratorio y Farmacia': 'Alterna la mano con la que sostienes gradillas o viales para no sobrecargar el túnel carpiano dominante.',
    'Radiología y Monitores': 'Ajusta el contraste de tus estaciones PACS al nivel recomendado y mantén una distancia mínima de 50 cm a las pantallas.',
    'Administración y Admisión': 'Levántate de la silla cada 45 minutos al menos 30 segundos para reactivar el retorno venoso periférico.',
    'Servicios Generales y Camilleros': 'Al empujar camillas o carros de ropa, mantén los codos flexionados a 90° y empuja con la fuerza de piernas, no de lumbares.'
  };

  const shiftNote = shift === 'Guardia Nocturna' ? ' (Consejo especial de guardia nocturna: evita café en las últimas 3 horas del turno para facilitar el sueño reparador posterior).' : '';

  return (tips[role] || 'Recuerda que cuidar de ti mismo es el primer requisito para cuidar con excelencia a tus pacientes.') + shiftNote;
}
