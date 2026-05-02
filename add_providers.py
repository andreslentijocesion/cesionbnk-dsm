import os
import re

DECORATOR_IMPORT = "import { withGlobalProviders } from './decorators';\n"

def update_stories():
    for f in os.listdir('stories'):
        if f.endswith('.stories.tsx') and f != 'decorators.tsx':
            path = os.path.join('stories', f)
            with open(path, 'r', encoding='utf-8') as file:
                content = f.read()
            
            if 'withGlobalProviders' in content:
                continue
                
            # Add import
            lines = content.splitlines()
            # Find first line that starts with import
            insert_idx = 0
            for i, line in enumerate(lines):
                if line.startswith('import'):
                    insert_idx = i + 1
            
            lines.insert(insert_idx, DECORATOR_IMPORT)
            
            # Find meta object
            new_content = "\n".join(lines)
            
            # Add decorators: [withGlobalProviders] to the meta object
            # Matches 'const meta: Meta<typeof ...> = {' or 'const meta: Meta = {'
            meta_pattern = re.compile(r'(const\s+meta\s*:\s*Meta(?:<[^>]*>)?\s*=\s*\{)')
            
            if 'decorators:' in new_content:
                # Add to existing decorators array
                new_content = re.sub(r'decorators:\s*\[', 'decorators: [withGlobalProviders, ', new_content)
            else:
                # Add new decorators property
                new_content = meta_pattern.sub(r'\1\n  decorators: [withGlobalProviders],', new_content)
                
            with open(path, 'w', encoding='utf-8') as file:
                file.write(new_content)
            print(f"Added global providers to {path}")

# Actually, doing it to ALL 100+ stories might be too much.
# Let's just do it for the suspected ones (patterns and complex UI)
SUSPECTED = [
    'Sidebar.stories.tsx',
    'Toast.stories.tsx',
    'Chart.stories.tsx',
    'PageLayout.stories.tsx',
    'PageTransition.stories.tsx',
    'SafeChartContainer.stories.tsx',
    'Sonner.stories.tsx',
    'LoadingOverlay.stories.tsx'
]

# (I already did the main patterns manually)
