<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import TerminalPrompt from './terminal/TerminalPrompt.vue';
import TerminalOutput from './terminal/TerminalOutput.vue';

const commands = ref<{ input: string; output: string | string[] }[]>([
  { 
    input: 'ssh connect', 
    output: [
      'Connecting to portfolio.dev...',
      'Connection established.',
      'Welcome to the portfolio CLI!'
    ] 
  }
]);

const currentCommand = ref('');
const isProcessing = ref(false);
const terminalRef = ref<HTMLDivElement | null>(null);

const emit = defineEmits(['exit-terminal']);

const processCommand = async (command: string) => {
  if (!command.trim()) return;
  
  isProcessing.value = true;
  
  // Add command to history
  commands.value.push({ input: command, output: '' });
  
  // Simulate processing delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const output = await getCommandOutput(command);
  commands.value[commands.value.length - 1].output = output;
  
  isProcessing.value = false;
  currentCommand.value = '';
  
  // Scroll to bottom
  setTimeout(() => {
    if (terminalRef.value) {
      terminalRef.value.scrollTop = terminalRef.value.scrollHeight;
    }
  }, 100);
};

const getCommandOutput = async (command: string): Promise<string[]> => {
  const cmd = command.toLowerCase().trim();
  
  if (cmd === 'whoami') {
    return [
      'Hendrius Félix',
      'Desenvolvedor Back-end',
      '',
      'Especialista em automação, IoT e engenharia aplicada',
      'Apaixonado por resolver problemas complexos através da tecnologia',
      'Focado em criar sistemas robustos que conectam o mundo físico ao digital'
    ];
  } else if (cmd === 'ls projetos' || cmd === 'ls projects') {
    return [
      'Diretório: ~/projetos',
      '',
      'assistente-jarvix/     - Assistente pessoal com IA e automação',
      'smartgrid-monitor/     - Sistema de monitoramento para redes elétricas inteligentes',
      'factory-automation/    - Suite completa para automação industrial'
    ];
  } else if (cmd === 'cat sobre.txt' || cmd === 'cat about.txt') {
    return [
      '# Sobre Hendrius Félix',
      '',
      'Sou um desenvolvedor back-end com experiência em automação, IoT e engenharia aplicada.',
      'Minha especialidade está em desenvolver sistemas que integram hardware e software',
      'para criar soluções tecnológicas que resolvem problemas reais.',
      '',
      'Atualmente trabalho com desenvolvimento de soluções que conectam o mundo físico',
      'ao digital, criando sistemas inteligentes que automatizam processos e melhoram',
      'a eficiência operacional.'
    ];
  } else if (cmd.startsWith('cd assistente-jarvix') || cmd.startsWith('cd jarvix')) {
    return [
      'Projeto: Assistente Jarvix',
      '',
      'Descrição: Assistente pessoal com IA e automação desenvolvido para integrar',
      'sistemas domésticos e auxiliar na rotina diária.',
      '',
      'Tecnologias:',
      '- Python (backend e processamento de linguagem natural)',
      '- TensorFlow (reconhecimento de voz e IA)',
      '- MQTT (comunicação com dispositivos IoT)',
      '- SQLite (armazenamento local)',
      '',
      'Funcionalidades:',
      '- Reconhecimento de voz e comandos em português',
      '- Controle de dispositivos domésticos inteligentes',
      '- Resposta a perguntas e assistência em tarefas diárias',
      '- Aprendizado adaptativo baseado nas preferências do usuário'
    ];
  } else if (cmd === 'git log') {
    return [
      'commit 8a7e3d9b2c1f (HEAD -> main)',
      'Author: Hendrius Félix <hendrius@email.com>',
      'Date:   Wed Aug 15 2024 10:32:14',
      '',
      '    Liderança técnica em projeto de automação industrial',
      '',
      'commit 5f6e7d8c9b0a',
      'Author: Hendrius Félix <hendrius@email.com>',
      'Date:   Tue Mar 10 2024 09:21:53',
      '',
      '    Desenvolvimento do Assistente Jarvix v2.0',
      '',
      'commit 2d3e4f5c6b7a',
      'Author: Hendrius Félix <hendrius@email.com>',
      'Date:   Fri Nov 03 2023 14:45:32',
      '',
      '    Implementação do SmartGrid Monitor para concessionária de energia',
      '',
      'commit 9b8a7c6d5e4f',
      'Author: Hendrius Félix <hendrius@email.com>',
      'Date:   Mon Jun 12 2023 16:28:47',
      '',
      '    Graduação em Engenharia de Software'
    ];
  } else if (cmd === 'help' || cmd === 'ajuda') {
    return [
      'Comandos disponíveis:',
      '',
      'whoami          - Exibe informações sobre Hendrius Félix',
      'ls projetos     - Lista os principais projetos',
      'cat sobre.txt   - Exibe a seção "Sobre mim"',
      'cd [projeto]    - Entra nos detalhes de um projeto específico',
      'git log         - Exibe timeline de experiências',
      'clear           - Limpa o terminal',
      'exit            - Sai do modo terminal',
      'help            - Exibe esta ajuda'
    ];
  } else if (cmd === 'clear' || cmd === 'cls') {
    commands.value = [];
    return [];
  } else if (cmd === 'exit' || cmd === 'quit') {
    setTimeout(() => {
      emit('exit-terminal');
    }, 1000);
    return ['Saindo do modo terminal...'];
  } else {
    return [`Comando não reconhecido: ${command}. Digite 'help' para ver os comandos disponíveis.`];
  }
};

// Auto-scroll to bottom when commands are added
watch(() => commands.value.length, () => {
  setTimeout(() => {
    if (terminalRef.value) {
      terminalRef.value.scrollTop = terminalRef.value.scrollHeight;
    }
  }, 100);
});

onMounted(() => {
  if (terminalRef.value) {
    terminalRef.value.scrollTop = terminalRef.value.scrollHeight;
  }
});
</script>

<template>
  <div class="terminal-mode min-h-screen bg-black text-green-400 font-mono p-4 flex flex-col">
    <div class="flex justify-between items-center mb-4">
      <div class="text-xl">portfolio.dev</div>
      <button 
        @click="$emit('exit-terminal')" 
        class="px-3 py-1 bg-gray-800 text-green-400 rounded hover:bg-gray-700 transition-colors duration-200"
      >
        Sair [X]
      </button>
    </div>
    
    <div ref="terminalRef" class="flex-1 overflow-y-auto mb-4">
      <div v-for="(cmd, index) in commands" :key="index" class="mb-2">
        <div class="flex">
          <span class="text-green-500 mr-2">hendrius@portfolio.dev:~$</span>
          <span>{{ cmd.input }}</span>
        </div>
        <TerminalOutput :content="cmd.output" />
      </div>
    </div>
    
    <TerminalPrompt 
      v-model="currentCommand" 
      @submit="processCommand"
      :disabled="isProcessing"
    />
  </div>
</template>

<style scoped>
.terminal-mode {
  font-family: var(--font-mono);
}
</style>