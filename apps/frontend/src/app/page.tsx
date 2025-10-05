'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {
  Send,
  FolderOpen,
  FileText,
  Save,
  Loader2,
  MessageSquare,
  File,
  Folder,
  Settings,
  Play,
  Terminal as TerminalIcon,
} from 'lucide-react'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'

interface Message {
  id: string
  content: string
  isUser: boolean
  timestamp: Date
  type?: 'text' | 'file-list' | 'error' | 'success' | 'code'
}

interface FileNode {
  path: string
  name: string
  type: 'file' | 'folder'
  size?: number
  children?: FileNode[]
}

interface TabFile {
  path: string
  name: string
  content: string
  isDirty: boolean
  type: 'code' | 'text' | 'json' | 'image'
}

export default function TigerCLIPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [currentPath, setCurrentPath] = useState('/home/z/my-project')
  const [apiKey, setApiKey] = useState('')
  const [fileTree, setFileTree] = useState<FileNode[]>([])
  const [openFiles, setOpenFiles] = useState<TabFile[]>([])
  const [activeFilePath, setActiveFilePath] = useState<string | null>(null)
  const [isProjectLoaded, setIsProjectLoaded] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Load API key from localStorage
  useEffect(() => {
    const storedApiKey = localStorage.getItem('geminiApiKey')
    if (storedApiKey) {
      setApiKey(storedApiKey)
    }
  }, [])

  // Save API key to localStorage
  useEffect(() => {
    if (apiKey) {
      localStorage.setItem('geminiApiKey', apiKey)
    }
  }, [apiKey])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const addMessage = (content: string, isUser: boolean, type: Message['type'] = 'text') => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      isUser,
      timestamp: new Date(),
      type
    }
    setMessages(prev => [...prev, newMessage])
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    if (!apiKey || apiKey.length === 0) {
      addMessage('Erreur: Clé API Gemini manquante. Veuillez configurer votre clé API dans les paramètres.', false, 'error')
      return
    }

    const userMessage = inputValue.trim()
    setInputValue('')
    addMessage(userMessage, true)
    setIsLoading(true)

    try {
      // Simulate API response for now
      setTimeout(() => {
        addMessage('Je suis TigerCLI, votre assistant de développement IA. Comment puis-je vous aider aujourd\'hui?', false, 'text')
        setIsLoading(false)
      }, 1000)
    } catch (error) {
      console.error('Chat API error:', error)
      addMessage(`Erreur de communication: ${error}`, false, 'error')
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleLoadProject = () => {
    if (currentPath.trim()) {
      setIsProjectLoaded(true)
      // Mock file tree
      setFileTree([
        {
          path: '/tigercli-project',
          name: 'tigercli-project',
          type: 'folder',
          children: [
            { path: '/tigercli-project/src', name: 'src', type: 'folder', children: [] },
            { path: '/tigercli-project/README.md', name: 'README.md', type: 'file' },
            { path: '/tigercli-project/package.json', name: 'package.json', type: 'file' },
          ]
        }
      ])
    }
  }

  const formatMessageContent = (content: string, type?: Message['type']) => {
    if (type === 'error') {
      return (
        <Alert className="border-red-500/50 bg-red-950/20">
          <AlertDescription className="text-red-400">
            {content}
          </AlertDescription>
        </Alert>
      )
    }

    if (type === 'success') {
      return (
        <Alert className="border-green-500/50 bg-green-950/20">
          <AlertDescription className="text-green-400">
            {content}
          </AlertDescription>
        </Alert>
      )
    }

    return (
      <div className="whitespace-pre-wrap text-sm leading-relaxed">
        {content}
      </div>
    )
  }

  return (
    <div className="flex h-screen flex-col bg-[#1a1a1a] text-[#e0e0e0]">
      {/* Menu Bar */}
      <header className="border-b border-[#333333] bg-[#1a1a1a] px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <h1 className="text-lg font-bold text-[#0078d4]">TigerCLI</h1>
            <nav className="flex items-center gap-4 text-sm">
              <button className="hover:text-[#0078d4] transition-colors">Fichier</button>
              <button className="hover:text-[#0078d4] transition-colors">Édition</button>
              <button className="hover:text-[#0078d4] transition-colors">Vue</button>
              <button className="hover:text-[#0078d4] transition-colors">Exécuter</button>
              <button className="hover:text-[#0078d4] transition-colors">Terminal</button>
              <button className="hover:text-[#0078d4] transition-colors">Aide</button>
              <button className="hover:text-[#0078d4] transition-colors">
                <Settings className="w-4 h-4" />
              </button>
            </nav>
          </div>
          <div className="flex items-center gap-2">
            <Input
              placeholder="Chemin du projet..."
              value={currentPath}
              onChange={(e) => setCurrentPath(e.target.value)}
              className="w-80 bg-[#252525] border-[#333333] text-[#e0e0e0]"
            />
            <Button onClick={handleLoadProject} size="sm" className="bg-[#0078d4] hover:bg-[#0078d4]/90">
              <FolderOpen className="w-4 h-4 mr-2" />
              Charger
            </Button>
          </div>
        </div>
      </header>

      {isProjectLoaded ? (
        <ResizablePanelGroup direction="horizontal" className="flex-1">
          {/* Left Panel: Explorer + Terminal */}
          <ResizablePanel defaultSize={20} minSize={15}>
            <ResizablePanelGroup direction="vertical">
              {/* File Explorer */}
              <ResizablePanel defaultSize={60} minSize={30}>
                <div className="h-full bg-[#252525] border-r border-[#333333]">
                  <div className="p-3 border-b border-[#333333]">
                    <h2 className="text-sm font-semibold text-[#e0e0e0]">EXPLORATEUR</h2>
                  </div>
                  <ScrollArea className="h-[calc(100%-48px)]">
                    <div className="p-2">
                      {fileTree.map((node) => (
                        <FileTreeNode key={node.path} node={node} level={0} />
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              </ResizablePanel>
              
              <ResizableHandle withHandle />
              
              {/* Terminal */}
              <ResizablePanel defaultSize={40} minSize={20}>
                <div className="h-full bg-[#1a1a1a] border-r border-[#333333]">
                  <div className="p-3 border-b border-[#333333] flex items-center justify-between">
                    <h2 className="text-sm font-semibold text-[#e0e0e0]">TERMINAL</h2>
                    <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                      <Play className="w-3 h-3" />
                    </Button>
                  </div>
                  <div className="p-4 font-mono text-sm">
                    <div className="text-green-400">user@tigercli:~$</div>
                    <div className="text-[#e0e0e0] opacity-70">npm install</div>
                    <div className="text-[#e0e0e0] opacity-70">npm run dev</div>
                  </div>
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>

          <ResizableHandle withHandle />

          {/* Center: Editor + Chat */}
          <ResizablePanel defaultSize={60} minSize={40}>
            <ResizablePanelGroup direction="vertical">
              {/* Monaco Editor */}
              <ResizablePanel defaultSize={60} minSize={30}>
                <div className="h-full bg-[#1a1a1a]">
                  <div className="border-b border-[#333333] bg-[#252525] px-4 py-2 flex items-center gap-2">
                    <div className="flex items-center gap-1 px-3 py-1 bg-[#1a1a1a] rounded text-sm">
                      <FileText className="w-3 h-3 text-blue-400" />
                      <span>App.tsx</span>
                      <button className="ml-2 hover:text-red-400">×</button>
                    </div>
                    <div className="flex items-center gap-1 px-3 py-1 hover:bg-[#1a1a1a] rounded text-sm opacity-70">
                      <FileText className="w-3 h-3" />
                      <span>index.tsx</span>
                    </div>
                  </div>
                  <div className="p-4 font-mono text-sm">
                    <div className="flex">
                      <span className="text-[#858585] w-12 text-right pr-4">1</span>
                      <span><span className="text-[#569cd6]">import</span> <span className="text-[#9cdcfe]">React</span> <span className="text-[#569cd6]">from</span> <span className="text-[#ce9178]">'react'</span>;</span>
                    </div>
                    <div className="flex">
                      <span className="text-[#858585] w-12 text-right pr-4">2</span>
                      <span><span className="text-[#569cd6]">import</span> <span className="text-[#ce9178]">'./index.css'</span>;</span>
                    </div>
                    <div className="flex">
                      <span className="text-[#858585] w-12 text-right pr-4">3</span>
                      <span></span>
                    </div>
                    <div className="flex">
                      <span className="text-[#858585] w-12 text-right pr-4">4</span>
                      <span><span className="text-[#569cd6]">const</span> <span className="text-[#4fc1ff]">App</span>: <span className="text-[#4ec9b0]">React.FC</span> = () =&gt; {'{'}</span>
                    </div>
                    <div className="flex">
                      <span className="text-[#858585] w-12 text-right pr-4">5</span>
                      <span className="ml-4"><span className="text-[#c586c0]">return</span> (</span>
                    </div>
                    <div className="flex">
                      <span className="text-[#858585] w-12 text-right pr-4">6</span>
                      <span className="ml-8">&lt;<span className="text-[#4ec9b0]">div</span>&gt;Hello, world!&lt;/<span className="text-[#4ec9b0]">div</span>&gt;</span>
                    </div>
                    <div className="flex">
                      <span className="text-[#858585] w-12 text-right pr-4">7</span>
                      <span className="ml-4">)</span>
                    </div>
                    <div className="flex">
                      <span className="text-[#858585] w-12 text-right pr-4">8</span>
                      <span>{'}'}</span>
                    </div>
                  </div>
                </div>
              </ResizablePanel>

              <ResizableHandle withHandle />

              {/* Chat IA */}
              <ResizablePanel defaultSize={40} minSize={20}>
                <Card className="flex h-full flex-col rounded-none border-x-0 border-b-0 bg-[#252525] border-[#333333]">
                  <CardHeader className="pb-3 border-b border-[#333333]">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base font-semibold text-[#e0e0e0]">
                        ASSISTANT IA
                      </CardTitle>
                      <Badge variant="secondary" className="text-xs bg-[#333333]">
                        {messages.length} messages
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col p-0">
                    <ScrollArea className="flex-1 px-4">
                      <div className="space-y-3 py-4">
                        {messages.length === 0 && (
                          <div className="text-center text-[#858585] py-8">
                            <MessageSquare className="w-10 h-10 mx-auto mb-3 opacity-50" />
                            <p className="text-sm">
                              Posez-moi une question sur votre code...
                            </p>
                          </div>
                        )}
                        {messages.map((message) => (
                          <div
                            key={message.id}
                            className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                          >
                            <div
                              className={`max-w-[80%] rounded px-3 py-2 text-sm ${
                                message.isUser
                                  ? 'bg-[#0078d4] text-white'
                                  : 'bg-[#333333] text-[#e0e0e0]'
                              }`}
                            >
                              {formatMessageContent(message.content, message.type)}
                              <div className="text-xs opacity-60 mt-1">
                                {message.timestamp.toLocaleTimeString()}
                              </div>
                            </div>
                          </div>
                        ))}
                        {isLoading && (
                          <div className="flex justify-start">
                            <div className="bg-[#333333] rounded px-3 py-2">
                              <div className="flex items-center gap-2">
                                <Loader2 className="w-4 h-4 animate-spin" />
                                <span className="text-sm">Réflexion...</span>
                              </div>
                            </div>
                          </div>
                        )}
                        <div ref={messagesEndRef} />
                      </div>
                    </ScrollArea>
                    <Separator />
                    <div className="p-3 bg-[#1a1a1a]">
                      <div className="flex gap-2">
                        <Input
                          placeholder="Demandez à l'IA..."
                          value={inputValue}
                          onChange={(e) => setInputValue(e.target.value)}
                          onKeyPress={handleKeyPress}
                          disabled={isLoading}
                          className="flex-1 bg-[#252525] border-[#333333] text-[#e0e0e0]"
                        />
                        <Button
                          onClick={handleSendMessage}
                          disabled={isLoading || !inputValue.trim()}
                          size="icon"
                          className="bg-[#0078d4] hover:bg-[#0078d4]/90"
                        >
                          {isLoading ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Send className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>

          <ResizableHandle withHandle />

          {/* Right Panel: Preview */}
          <ResizablePanel defaultSize={20} minSize={15}>
            <div className="h-full bg-[#252525] border-l border-[#333333]">
              <div className="p-3 border-b border-[#333333]">
                <h2 className="text-sm font-semibold text-[#e0e0e0]">PRÉVISUALISATION</h2>
              </div>
              <div className="p-4 bg-[#1a1a1a] h-[calc(100%-48px)] m-3 rounded flex items-center justify-center">
                <div className="text-center text-[#858585]">
                  <p className="text-4xl mb-2">👋</p>
                  <p className="text-lg font-semibold">Hello, world!</p>
                  <p className="text-sm mt-4 opacity-70">Prévisualisation en direct</p>
                </div>
              </div>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      ) : (
        <div className="flex-1 flex items-center justify-center bg-[#1a1a1a]">
          <div className="text-center">
            <FolderOpen className="w-16 h-16 mx-auto mb-4 text-[#0078d4]" />
            <h2 className="text-2xl font-semibold mb-4 text-[#e0e0e0]">Bienvenue dans TigerCLI</h2>
            <p className="mb-6 text-[#858585]">Chargez un projet pour commencer à éditer des fichiers.</p>
            <Button onClick={handleLoadProject} className="bg-[#0078d4] hover:bg-[#0078d4]/90">
              <FolderOpen className="w-4 h-4 mr-2" />
              Charger un projet
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

// File Tree Node Component
function FileTreeNode({ node, level }: { node: FileNode; level: number }) {
  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <div>
      <div
        className="flex items-center gap-2 px-2 py-1 hover:bg-[#333333] cursor-pointer rounded text-sm"
        style={{ paddingLeft: `${level * 12 + 8}px` }}
        onClick={() => setIsOpen(!isOpen)}
      >
        {node.type === 'folder' ? (
          <Folder className="w-4 h-4 text-blue-400" />
        ) : (
          <File className="w-4 h-4 text-[#858585]" />
        )}
        <span>{node.name}</span>
      </div>
      {isOpen && node.children && (
        <div>
          {node.children.map((child) => (
            <FileTreeNode key={child.path} node={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  )
}
