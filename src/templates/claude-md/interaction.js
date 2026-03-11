export function interactionSection(ctx) {
  const lines = ['## Interaction Preferences'];

  switch (ctx.interactionStyle) {
    case 'detailed':
      lines.push('- Explain your reasoning and the trade-offs of your decisions');
      lines.push('- When making changes, describe what you changed and why');
      lines.push('- If there are multiple approaches, briefly outline the alternatives');
      lines.push('- Include relevant documentation links when introducing new patterns');
      break;

    case 'concise':
      lines.push('- Be concise — skip explanations unless asked');
      lines.push('- Lead with the code change, not the reasoning');
      lines.push('- Only explain when the logic is non-obvious');
      lines.push('- Skip preamble and summaries');
      break;

    case 'pair':
      lines.push('- Think out loud as you work through problems');
      lines.push('- Share your thought process before writing code');
      lines.push('- Ask clarifying questions when requirements are ambiguous');
      lines.push('- Suggest improvements you notice while working on something else');
      break;
  }

  lines.push('');
  return lines.join('\n');
}
