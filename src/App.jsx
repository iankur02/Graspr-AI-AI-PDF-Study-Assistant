import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  LayoutPanelLeft,
  FileUp,
  BarChart3,
  CheckSquare,
  History,
  Cpu,
  Award,
  UserCheck,
  Search,
  PlusCircle,
  Headphones,
  ChevronUp,
  ChevronRight,
  ChevronLeft,
  FileText,
  Youtube,
  Mic,
  BookOpen,
  Sparkles,
  Wand2,
  X,
  MessageSquareCode,
  Layers,
  MessageCircle,
  NotebookPen,
  Link2,
  GraduationCap,
  Lightbulb,
  FileCheck2,
  Copy,
  MessagesSquare,
  RotateCcw,
  Send,
  RefreshCw,
  BookmarkCheck,
  HelpCircle,
  Download,
  Radio,
  Play,
  ArrowLeft,
  ArrowRight,
  UploadCloud,
  Zap,
  Files,
  BookCheck,
  Trophy,
  MessageSquareQuote,
  Flame,
  Plus,
  Bookmark,
  MessageSquareText,
  CheckCircle2,
  ShieldCheck,
  BookOpenCheck
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts';

// ---------------------------------------------------------------------------
// INITIAL ACADEMIC SEED DATA (CHAM 1802, CS 301 Networks, CS 405 RAG)
// ---------------------------------------------------------------------------
const INITIAL_DOCUMENTS = [
  {
    id: 'doc-chem-1802',
    title: 'Polarity of a Covalent Bond — CHAM 1802',
    folder: 'CHAM 1802',
    fileUrl: '/uploads/cham_1802_chemical_bonding.pdf',
    pageCount: 10,
    createdAt: '2026-10-28',
    youtubeUrl: 'https://www.youtube.com/watch?v=PoQjsnQmxok',
    youtubeTitle: 'MIT 5.111 Lecture: Covalent Bonding, Electronegativity & Dipole Moments',
    audioTitle: 'Prof. Williams Audio Lecture — Molecular Polarity & VSEPR (14:20)',
    starterPrompts: [
      'Why does BF3 have a net dipole moment of zero despite polar B-F bonds?',
      'Define 1 Debye (D) in SI units (Coulomb-meters) with the formula.',
      'Compare the bond dipole direction in H-F versus BeF2.',
      'When is a covalent bond considered 50% ionic based on electronegativity?'
    ],
    chapters: [
      {
        chapterNumber: 1,
        title: '5.6.5 Polarity of a Covalent Bond & Dipole Moments',
        pageStart: 1,
        pageEnd: 4,
        paragraphs: [
          {
            heading: '5.6.5 Polarity of a Covalent Bond',
            text: 'Covalent bonds are formed between two atoms of the same or different elements. Thus a covalent bond is formed between atoms of elements such as H–H, F–F, O–O and N–N. The shared pair of electrons is attracted equally by both atoms and is situated midway between the two nuclei. Such a covalent bond is termed a Non-polar Covalent bond (e.g., H : H, where the electron pair lies exactly at the center).'
          },
          {
            heading: 'Electronegativity & Charge Separation',
            text: 'When a covalent bond is formed between two atoms of different elements that have different electronegativities, the shared electron pair does not remain at the center. The electron pair is pulled toward the more electronegative atom, resulting in charge separation. This gives rise to a Polar Covalent Bond. The more electronegative atom acquires a partial negative charge (δ−) and the other atom gets a partial positive charge (δ+).'
          },
          {
            heading: 'Hydrogen Fluoride (Hδ+ —→ Fδ−) & 50% Ionic Threshold',
            text: 'Fluorine is more electronegative than Hydrogen; therefore the shared electron pair shifts toward Fluorine. When the difference in electronegativity (ΔEN) between combining atoms is about 1.7, the ionic percentage in the covalent bond is 50%.'
          },
          {
            heading: 'Dipole Moment (μ = q × r) & Debye Unit',
            text: '1 D (Debye) = 3.33564 × 10⁻³⁰ C·m (where C = coulomb, m = meter). Dipole moment being a vector quantity is represented by a small crossed arrow (↦) with the tail on the positive centre and head pointing towards the negative centre. For example, in HF, μ = 1.91 D.'
          },
          {
            heading: 'Dipole Moments of Polyatomic Molecules (BeF2 & BF3)',
            text: 'Each polar bond in a polyatomic molecule has its own bond dipole. The resultant dipole of the molecule is decided by (i) the spatial geometry of the molecule and (ii) the vector contribution of individual bond dipoles and lone pairs. In Beryllium Difluoride (BeF2, linear 180°), two equal bond dipoles point in opposite directions and cancel out to give Net dipole μ = 0 D. In Boron Trifluoride (BF3, trigonal planar 120°), the vector sum of any two B–F bond dipoles is equal and opposite to the third B–F bond, giving Net dipole μ = 0 D.'
          }
        ],
        summary: {
          overview:
            'Explains how electronegativity differences create polar vs. non-polar covalent bonds, defines the electric dipole moment (μ = q × r) measured in Debye (D), and proves via vector addition why symmetrical polyatomic molecules like BeF2 and BF3 have zero net dipole moment.',
          keyConcepts: [
            'Non-polar vs. Polar Covalent Bonds (δ+ and δ− charge separation)',
            '1.7 Electronegativity Difference Threshold → 50% Ionic Character',
            'Dipole Moment Vector (μ = q × r) and SI conversion (1 D = 3.33564 × 10⁻³⁰ C·m)',
            'Vector Cancellation in Linear (BeF2, 180°) and Trigonal Planar (BF3, 120°) Geometries'
          ],
          definitions: [
            {
              term: 'Dipole Moment (μ)',
              definition:
                'Product of the magnitude of partial charge (q) and the distance of separation (r) between positive and negative centers; a vector pointing toward the δ− atom.'
            },
            {
              term: 'Debye (D)',
              definition:
                'Standard unit of molecular dipole moment where 1 D = 3.33564 × 10⁻³⁰ Coulomb-meters (C·m).'
            },
            {
              term: 'Polar Covalent Bond',
              definition:
                'A covalent bond in which unequal sharing of electrons due to electronegativity difference produces partial charges.'
            }
          ],
          revisionNotes: [
            'H2, F2, O2, N2 have zero electronegativity difference → electron pair sits exactly midway → Non-polar.',
            'HF has μ = 1.91 D with crossed arrow pointing from H (δ+) to F (δ−).',
            'Individual B–F bonds in BF3 are polar, but three 120° coplanar vectors sum to zero (μ_net = 0).'
          ],
          teacherTip:
            'High-Frequency Exam Trap: Never confuse "polar bonds" with a "polar molecule." Always draw the 3D VSEPR geometry first—if the bond dipoles are symmetric with no lone pairs on the central atom (like BeF2, BF3, CCl4), the molecule is non-polar overall (μ = 0)!'
        },
        mcqs: [
          {
            id: 'q-chem-1',
            difficulty: 'Easy',
            questionText: 'What is the exact value of 1 Debye (1 D) in SI units (Coulomb-meters)?',
            options: [
              '3.33564 × 10⁻³⁰ C·m',
              '1.60218 × 10⁻¹⁹ C·m',
              '6.02214 × 10⁻²³ C·m',
              '9.10938 × 10⁻³¹ C·m'
            ],
            correctOptionIndex: 0,
            explanation:
              'As stated in Section 5.6.5 (Page 1), 1 Debye (D) equals 3.33564 × 10⁻³⁰ C·m, where C is coulomb and m is meter.',
            pageReference: 1
          },
          {
            id: 'q-chem-2',
            difficulty: 'Medium',
            questionText: 'Why is the net dipole moment (μ) of Boron Trifluoride (BF3) equal to zero?',
            options: [
              'Boron and Fluorine have identical electronegativities',
              'The three B–F bond dipoles are oriented at 120° in a plane and vectorially cancel out',
              'BF3 is a linear molecule with 180° bond angles',
              'Fluorine donates lone pairs back to Boron to neutralize charge'
            ],
            correctOptionIndex: 1,
            explanation:
              'In BF3 (Page 1), the molecule is trigonal planar with 120° bond angles. The resultant of any two B–F bond dipoles is equal in magnitude and opposite in direction to the third B–F bond dipole.',
            pageReference: 1
          },
          {
            id: 'q-chem-3',
            difficulty: 'Medium',
            questionText:
              'According to the textbook notes, at what electronegativity difference between two bonded atoms is the covalent bond approximately 50% ionic?',
            options: ['0.5', '1.0', '1.7', '2.5'],
            correctOptionIndex: 2,
            explanation:
              'Section 5.6.5 notes that when the electronegativity difference between combining atoms is about 1.7, the ionic percentage in the covalent bond is 50%.',
            pageReference: 1
          },
          {
            id: 'q-chem-4',
            difficulty: 'Hard',
            questionText:
              'Which statement accurately compares NH3 and NF3 dipole moments based on vector addition of lone pairs?',
            options: [
              'Both have zero dipole moment like BF3',
              'NH3 has a larger dipole moment than NF3 because the N–H bond dipoles reinforce the orbital dipole of the lone pair',
              'NF3 has a larger dipole moment because Fluorine is more electronegative than Hydrogen',
              'Lone pairs do not contribute to the resultant dipole moment of polyatomic molecules'
            ],
            correctOptionIndex: 1,
            explanation:
              'In polyatomic molecules with lone pairs, the resultant dipole depends on both bond dipoles and the lone pair dipole. In NH3, N–H dipoles point toward N (same direction as the lone pair), whereas in NF3, N–F dipoles oppose the lone pair.',
            pageReference: 3
          }
        ],
        flashcards: [
          {
            front: 'Formula & SI Unit of Electric Dipole Moment (μ)',
            back: 'μ = q × r | 1 Debye (D) = 3.33564 × 10⁻³⁰ C·m [Page 1]',
            page: 1
          },
          {
            front: 'Why does BeF2 have μ = 0 D?',
            back: 'BeF2 is linear (180°). The two equal Be→F bond dipoles point in exactly opposite directions and cancel to zero [Page 1].',
            page: 1
          },
          {
            front: 'Electronegativity difference for 50% ionic character',
            back: 'ΔEN ≈ 1.7 gives 50% ionic and 50% covalent character [Page 1].',
            page: 1
          },
          {
            front: 'Direction of the crossed dipole arrow (↦)',
            back: 'Tail is placed on the partial positive center (δ+) and arrowhead points toward the partial negative center (δ−) [Page 1].',
            page: 1
          }
        ],
        podcastDialogue: [
          {
            speaker: 'Host Alex',
            text: 'Welcome back to Graspr Audio Revision! Today we are breaking down Section 5.6.5: Polarity of a Covalent Bond and Dipole Moments.'
          },
          {
            speaker: 'Prof. Williams',
            text: 'Great to be here, Alex. The core idea is simple: when two identical atoms like H and H share electrons, the pair sits dead center. That is a non-polar covalent bond.'
          },
          {
            speaker: 'Host Alex',
            text: 'And what happens when one atom is an electron hog, like Fluorine in HF?'
          },
          {
            speaker: 'Prof. Williams',
            text: 'Fluorine pulls the shared pair closer, creating a partial negative charge on F and partial positive on H. We measure that polarity using the dipole moment μ, where 1 Debye is 3.33564 times 10 to the minus 30 Coulomb-meters. In BeF2 and BF3, symmetry cancels those vectors out to zero!'
          }
        ]
      },
      {
        chapterNumber: 2,
        title: '5.7 VSEPR Theory & Lone Pair Repulsions',
        pageStart: 5,
        pageEnd: 7,
        paragraphs: [
          {
            heading: '5.7 Valence Shell Electron Pair Repulsion (VSEPR) Theory',
            text: 'The shape of a covalent molecule is determined by the repulsions between all electron pairs present in the valence shell of the central atom. Electron pairs arrange themselves in 3D space to maximize distance and minimize electrostatic repulsion.'
          },
          {
            heading: 'Order of Repulsive Magnitude (Nyholm-Gillespie Rule)',
            text: 'Lone Pair–Lone Pair (lp–lp) > Lone Pair–Bond Pair (lp–bp) > Bond Pair–Bond Pair (bp–bp). Because lone pairs are localized on the central atom rather than shared between two nuclei, they occupy more angular volume and compress adjacent bond angles. Going from CH4 (109.5°) to NH3 (107°) to H2O (104.5°), each additional lone pair reduces the bond angle by roughly 2.5°.'
          }
        ],
        summary: {
          overview:
            'Covers VSEPR postulates and explains how lone pair repulsions distort ideal tetrahedral geometries in CH4, NH3, and H2O.',
          keyConcepts: [
            'Order of electron pair repulsions: lp–lp > lp–bp > bp–bp',
            'Tetrahedral angle compression: CH4 (109.5°) → NH3 (107°) → H2O (104.5°)'
          ],
          definitions: [
            {
              term: 'VSEPR Theory',
              definition:
                'Model predicting 3D molecular geometry based on minimizing electrostatic repulsion among valence electron pairs.'
            }
          ],
          revisionNotes: [
            'Lone pairs occupy more space than bonding pairs because they are attracted by only one nucleus.'
          ],
          teacherTip:
            'Always count both sigma bond pairs and lone pairs (Steric Number) before naming the molecular shape!'
        },
        mcqs: [
          {
            id: 'q-chem-5',
            difficulty: 'Easy',
            questionText:
              'What is the correct decreasing order of repulsion among valence electron pairs in VSEPR theory?',
            options: [
              'lp–lp > lp–bp > bp–bp',
              'bp–bp > lp–bp > lp–lp',
              'lp–bp > lp–lp > bp–bp',
              'All electron pairs repel equally'
            ],
            correctOptionIndex: 0,
            explanation:
              'Lone pairs occupy a larger spatial domain around a single nucleus, so lp–lp repulsion is strongest, followed by lp–bp, and finally bp–bp (Page 5).',
            pageReference: 5
          }
        ],
        flashcards: [
          {
            front: 'VSEPR Repulsion Order',
            back: 'Lone Pair–Lone Pair (lp–lp) > Lone Pair–Bond Pair (lp–bp) > Bond Pair–Bond Pair (bp–bp) [Page 5]',
            page: 5
          },
          {
            front: 'Bond Angles of CH4, NH3, and H2O',
            back: 'CH4: 109.5° (0 lp) | NH3: 107° (1 lp) | H2O: 104.5° (2 lp) [Page 6]',
            page: 6
          }
        ],
        podcastDialogue: [
          {
            speaker: 'Host Alex',
            text: 'Let us look at Chapter 5.7 on VSEPR Theory. Why does water have a 104.5 degree angle instead of 109.5?'
          },
          {
            speaker: 'Prof. Williams',
            text: 'Oxygen in water has two lone pairs. Since lone-pair to lone-pair repulsion is much stronger than bond-pair repulsion, those lone pairs push the two O-H bonds closer together!'
          }
        ]
      },
      {
        chapterNumber: 3,
        title: '5.8 Orbital Hybridization (sp, sp2, sp3)',
        pageStart: 8,
        pageEnd: 10,
        paragraphs: [
          {
            heading: '5.8 Concept of Orbital Hybridization',
            text: 'Atomic orbitals of comparable energy intermix to form an equal number of degenerate hybrid orbitals. The percentage of s-character directly influences bond length, bond enthalpy, and electronegativity: sp Hybridization (50% s-character, linear 180°, e.g., C2H2, BeCl2); sp2 Hybridization (33.3% s-character, trigonal planar 120°, e.g., C2H4, BF3); sp3 Hybridization (25% s-character, tetrahedral 109.5°, e.g., CH4).'
          }
        ],
        summary: {
          overview:
            'Explains orbital intermixing into sp, sp2, and sp3 hybrid orbitals and correlates s-character with bond angle and electronegativity.',
          keyConcepts: [
            'sp = 50% s-character (180°)',
            'sp2 = 33.3% s-character (120°)',
            'sp3 = 25% s-character (109.5°)'
          ],
          definitions: [
            {
              term: 'Hybridization',
              definition:
                'Redistribution of energy among atomic orbitals of slightly different energies to form degenerate hybrid orbitals.'
            }
          ],
          revisionNotes: [
            'Higher s-character holds electrons closer to the nucleus, increasing carbon electronegativity (sp > sp2 > sp3).'
          ],
          teacherTip:
            'Pi (π) bonds never participate in hybridization—only count sigma (σ) bonds plus localized lone pairs!'
        },
        mcqs: [
          {
            id: 'q-chem-6',
            difficulty: 'Medium',
            questionText:
              'What is the percentage of s-character in an sp2 hybridized orbital (such as Boron in BF3)?',
            options: ['25%', '33.3%', '50%', '75%'],
            correctOptionIndex: 1,
            explanation:
              'An sp2 hybrid orbital is formed by mixing one s and two p orbitals (1/3 = 33.3% s-character), yielding a 120° trigonal planar arrangement (Page 8).',
            pageReference: 8
          }
        ],
        flashcards: [
          {
            front: 's-character in sp, sp2, sp3 orbitals',
            back: 'sp: 50% | sp2: 33.3% | sp3: 25% [Page 8]',
            page: 8
          }
        ],
        podcastDialogue: [
          {
            speaker: 'Host Alex',
            text: 'In Section 5.8 we cover hybridization. What is the quickest shortcut to find hybridization in an exam?'
          },
          {
            speaker: 'Prof. Williams',
            text: 'Just add the number of sigma bonds and localized lone pairs! A sum of 2 is sp, 3 is sp2, and 4 is sp3.'
          }
        ]
      }
    ]
  },
  {
    id: 'doc-cs-301',
    title: 'Computer Networks Notes — OSI & TCP/IP',
    folder: 'CS 301',
    fileUrl: '/uploads/computer_networks_notes.pdf',
    pageCount: 12,
    createdAt: '2026-10-30',
    youtubeUrl: 'https://www.youtube.com/watch?v=vv4y_uOneC0',
    youtubeTitle: 'Stanford CS144 Lecture: The 7-Layer OSI Model & Encapsulation',
    audioTitle: 'CS 301 Audio Revision — OSI Layers & TCP 3-Way Handshake',
    starterPrompts: [
      'Which layer of the OSI model handles end-to-end flow control and port numbers?',
      'Explain PDU encapsulation from Application data down to Physical bits.',
      'What is the difference between a Switch (Layer 2) and a Router (Layer 3)?',
      'How does TCP congestion control differ from UDP?'
    ],
    chapters: [
      {
        chapterNumber: 1,
        title: 'Chapter 1: The OSI 7-Layer Reference Model',
        pageStart: 5,
        pageEnd: 12,
        paragraphs: [
          {
            heading: 'Chapter 1: ISO/OSI 7-Layer Architecture (Pages 5–12)',
            text: 'The Open Systems Interconnection (OSI) model standardizes network communication across seven distinct abstraction layers, each encapsulating a Protocol Data Unit (PDU): Layer 7 Application (Data: HTTP, DNS, SMTP), Layer 6 Presentation (TLS/SSL, UTF-8), Layer 5 Session (Dialog control), Layer 4 Transport (Segment/Datagram: TCP & UDP, port numbers, flow control), Layer 3 Network (Packet: IPv4/IPv6 logical addressing, OSPF/BGP routing), Layer 2 Data Link (Frame: MAC addressing, Ethernet switching, CRC trailer), and Layer 1 Physical (Raw bit stream).'
          }
        ],
        summary: {
          overview:
            'Details the responsibilities, protocols, and Protocol Data Units (PDUs) of all 7 layers in the ISO/OSI reference model (Pages 5–12).',
          keyConcepts: [
            'PDU Hierarchy: Data → Segment → Packet → Frame → Bits',
            'Layer 2 (MAC / Switch) vs. Layer 3 (IP / Router) vs. Layer 4 (Port / TCP-UDP)'
          ],
          definitions: [
            {
              term: 'Encapsulation',
              definition:
                'Process of prepending protocol headers (and Data Link trailers) as payload moves down the OSI stack.'
            },
            {
              term: 'Socket Address',
              definition:
                'Combination of a Layer 3 IP address and a Layer 4 Port number identifying a specific process.'
            }
          ],
          revisionNotes: [
            'Data Link layer adds both a Header (MAC addresses) and a Trailer (CRC Frame Check Sequence).'
          ],
          teacherTip:
            'Memorize the PDU names strictly: Layer 4 = Segment (TCP) or Datagram (UDP), Layer 3 = Packet, Layer 2 = Frame, Layer 1 = Bits.'
        },
        mcqs: [
          {
            id: 'q-net-1',
            difficulty: 'Easy',
            questionText: 'What is the Protocol Data Unit (PDU) at the Network Layer (Layer 3) of the OSI model?',
            options: ['Frame', 'Packet', 'Segment', 'Bit Stream'],
            correctOptionIndex: 1,
            explanation:
              'Layer 3 (Network Layer) encapsulates transport segments into IP Packets using logical IP source and destination addresses (Page 7).',
            pageReference: 7
          },
          {
            id: 'q-net-2',
            difficulty: 'Medium',
            questionText:
              'Which OSI layer appends BOTH a header and a trailer (CRC checksum) during encapsulation?',
            options: ['Physical Layer', 'Data Link Layer', 'Network Layer', 'Transport Layer'],
            correctOptionIndex: 1,
            explanation:
              'The Data Link Layer (Layer 2) encapsulates packets into Frames by adding a MAC header and a Frame Check Sequence (CRC) trailer (Page 9).',
            pageReference: 9
          }
        ],
        flashcards: [
          {
            front: 'What are the PDUs for Layers 4, 3, 2, and 1?',
            back: 'L4: Segment/Datagram | L3: Packet | L2: Frame | L1: Bits [Page 6]',
            page: 6
          },
          {
            front: 'Addressing used at Layers 2, 3, and 4',
            back: 'L2: Physical MAC Address | L3: Logical IP Address | L4: Port Number [Page 8]',
            page: 8
          }
        ],
        podcastDialogue: [
          {
            speaker: 'Host Alex',
            text: 'Today we are reviewing Computer Networks Chapter 1: The OSI Model, from pages 5 to 12.'
          },
          {
            speaker: 'Prof. Williams',
            text: 'Focus on the three lower networking layers: Layer 2 switches frames using MAC addresses, Layer 3 routes packets using IP addresses, and Layer 4 delivers segments to process ports!'
          }
        ]
      }
    ]
  },
  {
    id: 'doc-ai-405',
    title: 'RAG & Transformer Foundations — CS 405',
    folder: 'CS 405',
    fileUrl: '/uploads/rag_transformer_foundations.pdf',
    pageCount: 8,
    createdAt: '2026-11-01',
    youtubeUrl: 'https://www.youtube.com/watch?v=T-D1OfcDW1M',
    youtubeTitle: 'Stanford CS224N: Retrieval-Augmented Generation & Vector Search',
    audioTitle: 'CS 405 Audio Summary — Grounded RAG vs Hallucination',
    starterPrompts: [
      'How does RAG prevent LLM hallucinations on private PDF documents?',
      'What is the role of chunking overlap when splitting extracted PDF text?',
      'Compare keyword/BM25 retrieval with dense vector embeddings.'
    ],
    chapters: [
      {
        chapterNumber: 1,
        title: 'Chapter 1: Retrieval-Augmented Generation (RAG) Pipeline',
        pageStart: 1,
        pageEnd: 8,
        paragraphs: [
          {
            heading: 'Chapter 1: Grounded Document QA via RAG (Pages 1–8)',
            text: 'Retrieval-Augmented Generation (RAG) grounds Large Language Models in external, authoritative documents without retraining model weights. The pipeline operates in three stages: (1) Ingestion & Chunking: Extracted PDF text is segmented into overlapping windows (e.g., 500–700 characters with 100-character overlap) preserving page metadata; (2) Retrieval: Given a student query q, the top-k relevant chunks are retrieved via BM25 lexical scoring or cosine similarity cos(θ) = (A·B)/(||A||||B||); (3) Grounded Synthesis: The LLM answers exclusively from retrieved chunks with [Page X] citations.'
          }
        ],
        summary: {
          overview:
            'Explains the 3-step RAG architecture (Ingestion, Retrieval, Grounded Synthesis) used to build reliable document Q&A assistants.',
          keyConcepts: [
            'Chunk overlap preserves cross-boundary context',
            'Cosine similarity & BM25 lexical retrieval',
            'Grounded citation enforcement'
          ],
          definitions: [
            {
              term: 'RAG',
              definition:
                'Retrieval-Augmented Generation—combining information retrieval with LLM text generation to ground outputs in source documents.'
            }
          ],
          revisionNotes: [
            'When retrieved chunks have zero relevance score, the assistant must abstain rather than hallucinate.'
          ],
          teacherTip:
            'In interviews, highlight that RAG solves three problems at once: knowledge cutoff, hallucination, and per-user data privacy!'
        },
        mcqs: [
          {
            id: 'q-ai-1',
            difficulty: 'Medium',
            questionText:
              'Why do RAG pipelines use overlapping text chunks when splitting extracted PDF pages?',
            options: [
              'To double the size of the MongoDB database',
              'To preserve semantic context across chunk boundaries so sentences are not cut in half',
              'Because pdf-parse cannot read even-numbered pages',
              'To encrypt the PDF file during upload'
            ],
            correctOptionIndex: 1,
            explanation:
              'Overlapping chunks ensure that definitions or explanations spanning a chunk boundary remain intact for retrieval (Page 3).',
            pageReference: 3
          }
        ],
        flashcards: [
          {
            front: '3 Stages of a RAG Pipeline',
            back: '1. Ingestion & Chunking → 2. Top-K Retrieval (Keyword/Vector) → 3. Grounded LLM Synthesis with Citations [Page 2]',
            page: 2
          }
        ],
        podcastDialogue: [
          {
            speaker: 'Host Alex',
            text: 'Welcome to CS 405! Let us talk about how our own AI PDF Study Assistant uses RAG under the hood.'
          },
          {
            speaker: 'Prof. Williams',
            text: 'Instead of sending a 300-page textbook to the LLM all at once, we split the PDF into page-tagged chunks, retrieve only the top 3 matching passages for the student question, and require page citations!'
          }
        ]
      }
    ]
  }
];

const INITIAL_NOTES = [
  {
    id: 'n-1',
    docId: 'doc-chem-1802',
    tag: 'Formula',
    text: '1 Debye (D) = 3.33564 × 10⁻³⁰ C·m; Dipole arrow points from δ+ to δ−.',
    page: 1
  },
  {
    id: 'n-2',
    docId: 'doc-chem-1802',
    tag: 'Exam Tip',
    text: 'BeF2 (180° linear) and BF3 (120° trigonal planar) have polar bonds but net μ = 0 D due to vector cancellation.',
    page: 1
  },
  {
    id: 'n-3',
    docId: 'doc-cs-301',
    tag: 'Concept',
    text: 'OSI PDUs: Application (Data) → Transport (Segment) → Network (Packet) → Data Link (Frame) → Physical (Bits).',
    page: 6
  }
];

const INITIAL_SAVED_SUMMARIES = [
  {
    id: 'sum-1',
    docTitle: 'Polarity of a Covalent Bond — CHAM 1802',
    chapterTitle: '5.6.5 Polarity of a Covalent Bond & Dipole Moments',
    date: '2026-11-01',
    keyCount: 4
  },
  {
    id: 'sum-2',
    docTitle: 'Computer Networks Notes — OSI & TCP/IP',
    chapterTitle: 'Chapter 1: The OSI 7-Layer Reference Model',
    date: '2026-11-02',
    keyCount: 4
  }
];

const INITIAL_QUIZ_ATTEMPTS = [
  {
    id: 'att-1',
    docId: 'doc-chem-1802',
    docTitle: 'CHAM 1802: Covalent Bond Polarity',
    chapterTitle: '5.6.5 Polarity & Dipole Moments',
    score: 3,
    total: 4,
    percentage: 75,
    difficulty: 'Medium',
    date: 'Oct 29'
  },
  {
    id: 'att-2',
    docId: 'doc-cs-301',
    docTitle: 'CS 301: Computer Networks Notes',
    chapterTitle: 'Chapter 1: OSI 7-Layer Model',
    score: 2,
    total: 2,
    percentage: 100,
    difficulty: 'Easy',
    date: 'Oct 31'
  },
  {
    id: 'att-3',
    docId: 'doc-chem-1802',
    docTitle: 'CHAM 1802: Covalent Bond Polarity',
    chapterTitle: '5.7 VSEPR Theory',
    score: 4,
    total: 5,
    percentage: 80,
    difficulty: 'Medium',
    date: 'Nov 01'
  },
  {
    id: 'att-4',
    docId: 'doc-ai-405',
    docTitle: 'CS 405: RAG & Transformer Notes',
    chapterTitle: 'Chapter 1: RAG Pipeline',
    score: 5,
    total: 5,
    percentage: 100,
    difficulty: 'Hard',
    date: 'Nov 03'
  }
];

const INITIAL_CONVERSATIONS = {
  'doc-chem-1802': [
    {
      role: 'user',
      content: 'Why is BF3 non-polar (μ = 0) even though Fluorine is much more electronegative than Boron?'
    },
    {
      role: 'assistant',
      content:
        'Although each individual B–F bond is polar (because Fluorine pulls electron density away from Boron), BF₃ has a trigonal planar geometry where the three B–F bonds are oriented symmetrically at 120° to one another. The vector sum of any two B–F bond dipoles is equal in magnitude and exactly opposite in direction to the third B–F bond dipole, resulting in a net dipole moment of μ = 0 D.',
      citations: [{ page: 1, label: 'Page 1 — Sec 5.6.5 Dipole Moments of Polyatomic Molecules' }]
    }
  ],
  'doc-cs-301': [],
  'doc-ai-405': []
};

const I18N = {
  en: {
    navWorkspace: 'Workspace',
    navUpload: 'Upload PDF',
    navDashboard: 'Progress Dashboard',
    navQuiz: 'Quiz Center',
    navHistory: 'Study History',
    startNewChat: 'Start New Study Session',
    addNewPdf: 'Add New PDF',
    tabChat: 'Chat',
    tabNotes: 'Note-Taking',
    tabQuiz: 'Quiz Yourself',
    tabSummarize: 'Summarize',
    tabPodcast: 'Podcast',
    tabFlashcards: 'Flashcards'
  },
  fr: {
    navWorkspace: "Espace d'étude",
    navUpload: 'Importer PDF',
    navDashboard: 'Tableau de bord',
    navQuiz: 'Centre QCM',
    navHistory: 'Historique',
    startNewChat: 'Nouvelle session IA',
    addNewPdf: 'Ajouter un PDF',
    tabChat: 'Discuter',
    tabNotes: 'Notes',
    tabQuiz: 'Quiz QCM',
    tabSummarize: 'Résumer',
    tabPodcast: 'Audio IA',
    tabFlashcards: 'Cartes mémoire'
  }
};

// ---------------------------------------------------------------------------
// MAIN REACT APPLICATION COMPONENT
// ---------------------------------------------------------------------------
export default function App() {
  const [activeNav, setActiveNav] = useState('workspace');
  const [documents, setDocuments] = useState(INITIAL_DOCUMENTS);
  const [activeDocId, setActiveDocId] = useState('doc-chem-1802');
  const [activeChapterIdx, setActiveChapterIdx] = useState(0);
  const [activeSourceMode, setActiveSourceMode] = useState('pdf');
  const [activeRightTab, setActiveRightTab] = useState('chat');
  const [zoomLevel, setZoomLevel] = useState(100);
  const [language, setLanguage] = useState('en');

  // Sidebar filters
  const [folderFilter, setFolderFilter] = useState('CHAM 1802');
  const [showDocSearch, setShowDocSearch] = useState(false);
  const [docSearchQuery, setDocSearchQuery] = useState('');

  // Floating AI Context Menu
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [selectedSnippet, setSelectedSnippet] = useState('');

  // Right Panel States
  const [conversations, setConversations] = useState(INITIAL_CONVERSATIONS);
  const [chatInput, setChatInput] = useState('');
  const [quizDifficulty, setQuizDifficulty] = useState('All');
  const [workspaceQuizAnswers, setWorkspaceQuizAnswers] = useState({});
  const [notes, setNotes] = useState(INITIAL_NOTES);
  const [newNoteText, setNewNoteText] = useState('');
  const [newNoteTag, setNewNoteTag] = useState('Concept');
  const [savedSummaries, setSavedSummaries] = useState(INITIAL_SAVED_SUMMARIES);
  const [quizAttempts, setQuizAttempts] = useState(INITIAL_QUIZ_ATTEMPTS);

  // Podcast TTS State
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [ttsStatus, setTtsStatus] = useState('Ready');
  const [podcastSpeed, setPodcastSpeed] = useState('1');

  // Flashcards State
  const [flashcardIdx, setFlashcardIdx] = useState(0);
  const [isFlashcardFlipped, setIsFlashcardFlipped] = useState(false);

  // Upload View State
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadFolder, setUploadFolder] = useState('CHAM 1802');
  const [ocrFallback, setOcrFallback] = useState(true);
  const [uploadStatus, setUploadStatus] = useState(null);

  // Dashboard & Exam Countdown
  const [examDate, setExamDate] = useState('2026-11-17');
  const [examDaysLeft, setExamDaysLeft] = useState(14);

  // Full Quiz Center State
  const [fullQuizDocId, setFullQuizDocId] = useState('doc-chem-1802');
  const [fullQuizDiff, setFullQuizDiff] = useState('All');
  const [fullQuizAnswers, setFullQuizAnswers] = useState({});

  // Blueprint MongoDB Inspector State
  const [mongoCollection, setMongoCollection] = useState('Documents');

  // Student Profile Modal State
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [studentProfile, setStudentProfile] = useState({
    name: 'Sophia Williams',
    email: 'sophia@aisocui.com',
    target: 'B.Tech Semester Exams & GATE CS/Chem'
  });

  // Toast Notification
  const [toastMessage, setToastMessage] = useState(null);
  const toastTimerRef = useRef(null);

  const dict = I18N[language] || I18N.en;

  const triggerToast = (msg) => {
    setToastMessage(msg);
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const activeDoc = useMemo(
    () => documents.find((d) => d.id === activeDocId) || documents[0],
    [documents, activeDocId]
  );

  const activeChapter = useMemo(
    () => activeDoc.chapters[activeChapterIdx] || activeDoc.chapters[0],
    [activeDoc, activeChapterIdx]
  );

  const filteredSidebarDocs = useMemo(() => {
    return documents.filter((doc) => {
      const matchesFolder = folderFilter === 'ALL' || doc.folder === folderFilter;
      const matchesSearch =
        !docSearchQuery || doc.title.toLowerCase().includes(docSearchQuery.toLowerCase());
      return matchesFolder && matchesSearch;
    });
  }, [documents, folderFilter, docSearchQuery]);

  const averageQuizScore = useMemo(() => {
    if (!quizAttempts.length) return 88;
    return Math.round(
      quizAttempts.reduce((acc, item) => acc + item.percentage, 0) / quizAttempts.length
    );
  }, [quizAttempts]);

  // -------------------------------------------------------------------------
  // RAG CHAT HANDLER (Stage 4)
  // -------------------------------------------------------------------------
  const handleAskQuestion = (rawQuestion) => {
    const question = (rawQuestion || '').trim();
    if (!question) return;

    const qLower = question.toLowerCase();
    let matchedChapter = null;
    let bestScore = 0;

    activeDoc.chapters.forEach((ch) => {
      const corpus = (
        ch.title +
        ' ' +
        ch.summary.overview +
        ' ' +
        ch.summary.keyConcepts.join(' ') +
        ' ' +
        ch.summary.revisionNotes.join(' ') +
        ' ' +
        ch.summary.teacherTip
      ).toLowerCase();

      const words = qLower
        .replace(/[^a-z0-9\s]/g, ' ')
        .split(/\s+/)
        .filter((w) => w.length > 2);

      let score = 0;
      words.forEach((w) => {
        if (corpus.includes(w)) score += 2;
      });
      if (score > bestScore) {
        bestScore = score;
        matchedChapter = ch;
      }
    });

    let answerText = '';
    let citations = [];

    if (
      bestScore === 0 &&
      !qLower.includes('explain') &&
      !qLower.includes('summary') &&
      !qLower.includes('teacher')
    ) {
      answerText = `Unsupported Topic Alert: I searched all ${activeDoc.pageCount} pages of "${activeDoc.title}", and this question is not covered in your uploaded study material. To prevent hallucinations, I only answer using verified facts from your PDF. Try asking about ${activeDoc.chapters.map((c) => c.title).join(' or ')}.`;
      citations = [];
    } else {
      const ch = matchedChapter || activeChapter;
      const defText = ch.summary.definitions.length
        ? ` Key Definition (${ch.summary.definitions[0].term}): ${ch.summary.definitions[0].definition}`
        : '';
      answerText = `Based on ${ch.title}, ${ch.summary.overview}${defText} Important Revision Point: ${ch.summary.revisionNotes[0] || ch.summary.teacherTip}`;
      citations = [{ page: ch.pageStart, label: `Pages ${ch.pageStart}–${ch.pageEnd} — ${ch.title}` }];
    }

    setConversations((prev) => ({
      ...prev,
      [activeDoc.id]: [
        ...(prev[activeDoc.id] || []),
        { role: 'user', content: question },
        { role: 'assistant', content: answerText, citations }
      ]
    }));
  };

  // -------------------------------------------------------------------------
  // FLOATING CONTEXT MENU HANDLER
  // -------------------------------------------------------------------------
  const handleContextAction = (action, overrideText = '') => {
    const selText = (
      overrideText ||
      selectedSnippet ||
      (typeof window !== 'undefined' ? window.getSelection().toString() : '')
    ).trim();
    const snippet = selText || activeChapter.summary.keyConcepts[0] || activeChapter.title;
    setShowContextMenu(false);

    if (action === 'explain') {
      setActiveRightTab('chat');
      handleAskQuestion(`Explain this concept from the PDF in detail: "${snippet}"`);
    } else if (action === 'summarize') {
      setActiveRightTab('summarize');
      triggerToast('Opened Chapter Summary & Key Concepts');
    } else if (action === 'flashcard') {
      const newCard = {
        front: snippet.slice(0, 90),
        back: activeChapter.summary.overview,
        page: activeChapter.pageStart
      };
      setDocuments((prev) =>
        prev.map((d) => {
          if (d.id !== activeDoc.id) return d;
          const updatedChapters = d.chapters.map((c, idx) =>
            idx === activeChapterIdx ? { ...c, flashcards: [...c.flashcards, newCard] } : c
          );
          return { ...d, chapters: updatedChapters };
        })
      );
      setActiveRightTab('flashcards');
      triggerToast('Created new AI Flashcard from selection!');
    } else if (action === 'chat') {
      setActiveRightTab('chat');
      setChatInput(`Regarding "${snippet.slice(0, 70)}": `);
    } else if (action === 'notes') {
      setNotes((prev) => [
        {
          id: 'n-' + Date.now(),
          docId: activeDoc.id,
          tag: 'Highlight',
          text: snippet,
          page: activeChapter.pageStart
        },
        ...prev
      ]);
      setActiveRightTab('notes');
      triggerToast('Saved highlight to your Study Notes!');
    } else if (action === 'hyperlink') {
      const citation = `[${activeDoc.title} — ${activeChapter.title}, Page ${activeChapter.pageStart}]`;
      try {
        const temp = document.createElement('textarea');
        temp.value = citation;
        document.body.appendChild(temp);
        temp.select();
        document.execCommand('copy');
        document.body.removeChild(temp);
      } catch (err) {}
      triggerToast(`Copied citation hyperlink: ${citation}`);
    } else if (action === 'teacher') {
      setActiveRightTab('chat');
      setConversations((prev) => ({
        ...prev,
        [activeDoc.id]: [
          ...(prev[activeDoc.id] || []),
          {
            role: 'assistant',
            content: `What The Teacher Says (High-Yield Exam Insight): ${activeChapter.summary.teacherTip}`,
            citations: [{ page: activeChapter.pageStart, label: `Page ${activeChapter.pageStart} — Exam Focus` }]
          }
        ]
      }));
    }
  };

  // -------------------------------------------------------------------------
  // STAGE 1: PDF UPLOAD & EXTRACTION HANDLER
  // -------------------------------------------------------------------------
  const handleFileUpload = (file, simulatedText = '') => {
    if (!file) return;
    if (!file.name.toLowerCase().endsWith('.pdf') && file.type !== 'application/pdf') {
      triggerToast('Validation Error: Please upload a valid .pdf file.');
      return;
    }
    if (file.size > 25 * 1024 * 1024) {
      triggerToast('Validation Error: PDF exceeds 25 MB limit.');
      return;
    }

    const customTitle = uploadTitle.trim() || file.name.replace(/\.pdf$/i, '');
    const pageContent =
      simulatedText ||
      `Uploaded PDF Document (${file.name}): Core concepts, definitions, and academic study notes extracted via client-side parser & OCR fallback pipeline. This section covers foundational definitions, system models, and analytical derivations for examination preparation.`;

    setUploadStatus({
      fileName: file.name,
      percent: 100,
      steps: [
        '1. Validated PDF format & size',
        '2. Extracted page text & metadata',
        '3. Detected chapter boundaries',
        '4. Built RAG text chunks',
        '5. Generated AI Summary & MCQs',
        '6. Saved to Document Library'
      ]
    });

    const newDocId = 'doc-user-' + Date.now();
    const newDoc = {
      id: newDocId,
      title: customTitle,
      folder: uploadFolder,
      fileUrl: `/uploads/${file.name}`,
      pageCount: 4,
      createdAt: '2026-11-03',
      youtubeUrl: 'https://www.youtube.com',
      youtubeTitle: `${customTitle} — Supplemental University Lecture`,
      audioTitle: `${customTitle} — AI Audio Revision`,
      starterPrompts: [
        `Summarize the main concepts in ${customTitle}.`,
        `What are the key definitions on Page 1 of ${customTitle}?`,
        `Give me exam revision points for ${customTitle}.`,
        `What should I focus on for my semester test?`
      ],
      chapters: [
        {
          chapterNumber: 1,
          title: `Chapter 1: ${customTitle} Core Concepts`,
          pageStart: 1,
          pageEnd: 4,
          paragraphs: [
            {
              heading: `${customTitle} — Extracted Study Notes (Pages 1–4)`,
              text: pageContent
            }
          ],
          summary: {
            overview: `Extracted from ${file.name}: ${pageContent.slice(0, 240)}`,
            keyConcepts: [`${customTitle} Core Principles`, 'Page 1 Key Arguments', 'Structured Revision Notes'],
            definitions: [{ term: customTitle, definition: pageContent.slice(0, 160) }],
            revisionNotes: [pageContent.slice(0, 180)],
            teacherTip: 'Review Page 1 definitions carefully before taking the practice MCQ quiz.'
          },
          mcqs: [
            {
              id: `q-${newDocId}-1`,
              difficulty: 'Medium',
              questionText: `Which statement best reflects the extracted content on Page 1 of "${customTitle}"?`,
              options: [
                pageContent.slice(0, 95) + '...',
                'This page contains only unrelated bibliography entries',
                'The document states that no concepts apply to examinations',
                'None of the above'
              ],
              correctOptionIndex: 0,
              explanation: `Directly extracted and grounded in Page 1 of ${file.name}.`,
              pageReference: 1
            }
          ],
          flashcards: [
            { front: `${customTitle} — Page 1 Core Focus`, back: pageContent.slice(0, 180), page: 1 }
          ],
          podcastDialogue: [
            { speaker: 'Host Alex', text: `Let's review your newly uploaded PDF: ${customTitle}, Page 1.` },
            { speaker: 'Prof. Williams', text: `Here is the key excerpt from your notes: ${pageContent.slice(0, 200)}` }
          ]
        }
      ]
    };

    setDocuments((prev) => [newDoc, ...prev]);
    setFolderFilter('ALL');
    setActiveDocId(newDocId);
    setActiveChapterIdx(0);
    setTimeout(() => {
      setActiveNav('workspace');
      triggerToast(`Uploaded & Indexed "${customTitle}"`);
    }, 500);
  };

  // -------------------------------------------------------------------------
  // PODCAST SPEECH SYNTHESIS HANDLER
  // -------------------------------------------------------------------------
  const handlePlayPodcast = () => {
    setIsSpeaking(true);
    setTtsStatus('Speaking...');
    try {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const textToRead = (activeChapter.podcastDialogue || [])
          .map((d) => `${d.speaker} says: ${d.text}`)
          .join(' ');
        const utter = new SpeechSynthesisUtterance(textToRead);
        utter.rate = Number(podcastSpeed) || 1;
        utter.onend = () => {
          setIsSpeaking(false);
          setTtsStatus('Completed');
        };
        window.speechSynthesis.speak(utter);
      }
    } catch (e) {}
    triggerToast('Playing AI Audio Revision Podcast');
  };

  const handleStopPodcast = () => {
    try {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    } catch (e) {}
    setIsSpeaking(false);
    setTtsStatus('Paused');
  };

  // Active Document Flashcards
  const allDocFlashcards = useMemo(
    () => activeDoc.chapters.flatMap((c) => c.flashcards || []),
    [activeDoc]
  );
  const currentFlashcard = allDocFlashcards[flashcardIdx % Math.max(allDocFlashcards.length, 1)] || {
    front: 'No flashcards yet',
    back: 'Select text to create flashcards',
    page: 1
  };

  // Active Document Quiz Questions
  const workspaceQuestions = useMemo(() => {
    const allQ = activeDoc.chapters.flatMap((ch) => ch.mcqs);
    return quizDifficulty === 'All' ? allQ : allQ.filter((q) => q.difficulty === quizDifficulty);
  }, [activeDoc, quizDifficulty]);

  const workspaceQuizStats = useMemo(() => {
    let answered = 0;
    let correct = 0;
    workspaceQuestions.forEach((q) => {
      if (workspaceQuizAnswers[q.id] !== undefined) {
        answered++;
        if (workspaceQuizAnswers[q.id] === q.correctOptionIndex) correct++;
      }
    });
    const pct = answered > 0 ? Math.round((correct / answered) * 100) : 0;
    return { answered, correct, pct, total: workspaceQuestions.length };
  }, [workspaceQuestions, workspaceQuizAnswers]);

  // MongoDB JSON Preview
  const mongoJsonString = useMemo(() => {
    let payload = {};
    if (mongoCollection === 'Documents') {
      payload = {
        _id: activeDoc.id,
        userId: '663000000000000000000001',
        title: activeDoc.title,
        folder: activeDoc.folder,
        fileUrl: activeDoc.fileUrl,
        pageCount: activeDoc.pageCount,
        chapters: activeDoc.chapters.map((c) => ({
          title: c.title,
          pageStart: c.pageStart,
          pageEnd: c.pageEnd
        })),
        createdAt: activeDoc.createdAt
      };
    } else if (mongoCollection === 'Summaries') {
      payload = activeChapter.summary;
    } else if (mongoCollection === 'Questions') {
      payload = activeChapter.mcqs;
    } else if (mongoCollection === 'QuizAttempts') {
      payload = quizAttempts;
    } else {
      payload = conversations[activeDoc.id] || [];
    }
    return JSON.stringify(payload, null, 2);
  }, [mongoCollection, activeDoc, activeChapter, quizAttempts, conversations]);

  return (
    <div className="min-h-screen flex flex-col bg-[#f3f6f8] text-slate-800 font-sans">
      {/* ===================================================================
          TOP NAVIGATION BAR (Matches Graspr AI Header + Full Stage Switcher)
          =================================================================== */}
      <header className="bg-white border-b border-slate-200/80 px-4 py-2.5 sticky top-0 z-40 shadow-sm">
        <div className="max-w-[1600px] mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* Brand Logo */}
          <button
            type="button"
            onClick={() => setActiveNav('workspace')}
            className="flex items-center gap-2.5 group focus:outline-none"
          >
            <div className="w-9 h-9 rounded-xl bg-slate-900 flex items-center justify-center text-white shadow-sm group-hover:bg-emerald-600 transition-colors">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11 2.5L4 7v10l7 4.5V2.5zm2 0v19l7-4.5V7l-7-4.5z" />
              </svg>
            </div>
            <div className="text-left">
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg tracking-tight text-slate-900">Graspr AI</span>
                <span className="text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  React Study Assistant
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden sm:block">
                Intelligent Platform for Personalized PDF Learning
              </p>
            </div>
          </button>

          {/* Primary Navigation Pills */}
          <nav className="flex items-center gap-1 bg-slate-100/90 p-1 rounded-xl border border-slate-200/70 overflow-x-auto max-w-full">
            {[
              { id: 'workspace', label: dict.navWorkspace, icon: LayoutPanelLeft },
              { id: 'upload', label: dict.navUpload, icon: FileUp },
              { id: 'dashboard', label: dict.navDashboard, icon: BarChart3 },
              { id: 'quizcenter', label: dict.navQuiz, icon: CheckSquare },
              { id: 'history', label: dict.navHistory, icon: History },
              { id: 'blueprint', label: 'MERN & Workflow', icon: Cpu }
            ].map((item) => {
              const IconComp = item.icon;
              const isActive = activeNav === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveNav(item.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-white text-emerald-700 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <IconComp className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Header Utilities */}
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => setActiveNav('dashboard')}
              className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-medium text-slate-700 transition-colors"
            >
              <span className="flex -space-x-1.5">
                <span className="w-5 h-5 rounded-full bg-emerald-500 text-white text-[10px] flex items-center justify-center font-bold ring-2 ring-white">
                  S
                </span>
                <span className="w-5 h-5 rounded-full bg-teal-600 text-white text-[10px] flex items-center justify-center font-bold ring-2 ring-white">
                  A
                </span>
                <span className="w-5 h-5 rounded-full bg-cyan-600 text-white text-[10px] flex items-center justify-center font-bold ring-2 ring-white">
                  R
                </span>
              </span>
              <span>
                Exam Study Plan: <strong className="text-emerald-700">{examDaysLeft} Days Left</strong>
              </span>
            </button>

            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold">
              <Award className="w-4 h-4 text-emerald-600" />
              <span>Study Score:</span>
              <span className="font-bold">{averageQuizScore}%</span>
            </div>

            <button
              type="button"
              onClick={() => setShowProfileModal(true)}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
              title="Student Profile & Settings"
            >
              <UserCheck className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* ===================================================================
          MAIN VIEW ROUTER
          =================================================================== */}
      <main className="flex-1 max-w-[1600px] w-full mx-auto p-3 sm:p-4">
        {/* VIEW 1: 3-PANE DOCUMENT WORKSPACE */}
        {activeNav === 'workspace' && (
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
            {/* LEFT SIDEBAR (2 cols) */}
            <aside className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/80 shadow-sm p-3.5 flex flex-col justify-between min-h-[680px]">
              <div>
                <div className="flex items-center justify-between gap-2 pb-3 mb-3 border-b border-slate-100">
                  <select
                    value={folderFilter}
                    onChange={(e) => setFolderFilter(e.target.value)}
                    className="w-full text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent focus:outline-none cursor-pointer truncate"
                  >
                    <option value="ALL">FOLDER: ALL COURSES</option>
                    <option value="CHAM 1802">FOLDER: CHAM 1802</option>
                    <option value="CS 301">FOLDER: CS 301 NET</option>
                    <option value="CS 405">FOLDER: CS 405 AI</option>
                  </select>
                  <button
                    type="button"
                    onClick={() => setShowDocSearch((s) => !s)}
                    className="w-7 h-7 rounded-lg bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-500"
                    title="Filter Documents"
                  >
                    <Search className="w-3.5 h-3.5" />
                  </button>
                </div>

                {showDocSearch && (
                  <div className="mb-3">
                    <input
                      type="text"
                      value={docSearchQuery}
                      onChange={(e) => setDocSearchQuery(e.target.value)}
                      placeholder="Filter PDFs..."
                      className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                )}

                <div className="space-y-1.5 max-h-[270px] overflow-y-auto pr-1">
                  {filteredSidebarDocs.map((doc) => {
                    const isActive = doc.id === activeDoc.id;
                    return (
                      <button
                        key={doc.id}
                        type="button"
                        onClick={() => {
                          setActiveDocId(doc.id);
                          setActiveChapterIdx(0);
                          setFlashcardIdx(0);
                        }}
                        className={`w-full text-left px-3 py-2.5 rounded-xl text-xs transition-all flex items-center justify-between gap-2 ${
                          isActive
                            ? 'bg-emerald-50/90 text-emerald-800 font-semibold border border-emerald-200/80 shadow-xs'
                            : 'text-slate-600 hover:bg-slate-50 font-medium'
                        }`}
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <span
                            className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 text-[10px] font-bold ${
                              isActive ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-500'
                            }`}
                          >
                            PDF
                          </span>
                          <span className="truncate">{doc.title}</span>
                        </div>
                        <ChevronRight
                          className={`w-3.5 h-3.5 shrink-0 ${
                            isActive ? 'text-emerald-600' : 'text-slate-300'
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Start New Chat / Upload CTA Card */}
              <div className="my-4 p-3.5 rounded-2xl bg-slate-50/90 border border-slate-200/70 text-center">
                <div className="w-8 h-8 rounded-xl bg-white shadow-sm border border-slate-200/60 mx-auto mb-2 flex items-center justify-center text-slate-900">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11 2.5L4 7v10l7 4.5V2.5zm2 0v19l7-4.5V7l-7-4.5z" />
                  </svg>
                </div>
                <h3 className="text-xs font-bold text-slate-800">{dict.startNewChat}</h3>
                <p className="text-[11px] text-slate-500 mt-0.5 mb-3">
                  Information retrieval has never been this easy
                </p>
                <button
                  type="button"
                  onClick={() => setActiveNav('upload')}
                  className="w-full py-2 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-xs shadow-sm transition-all flex items-center justify-center gap-1.5"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>{dict.addNewPdf}</span>
                </button>
              </div>

              {/* Bottom Support, Language Switcher & User Profile */}
              <div className="pt-3 border-t border-slate-100 space-y-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowContextMenu((s) => !s);
                    triggerToast(
                      'Highlight any text in the PDF viewer to trigger Explain, Summarize, Flashcard, or Teacher Insights!'
                    );
                  }}
                  className="w-full flex items-center gap-2 text-xs font-medium text-slate-600 hover:text-emerald-600 px-1 transition-colors"
                >
                  <Headphones className="w-4 h-4 text-slate-400" />
                  <span>Interactive Feature Guide</span>
                </button>

                <div className="grid grid-cols-2 bg-slate-100 p-1 rounded-xl border border-slate-200/60">
                  <button
                    type="button"
                    onClick={() => setLanguage('en')}
                    className={`py-1 rounded-lg text-xs transition-all ${
                      language === 'en'
                        ? 'font-bold bg-emerald-500 text-white shadow-sm'
                        : 'font-semibold text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    EN
                  </button>
                  <button
                    type="button"
                    onClick={() => setLanguage('fr')}
                    className={`py-1 rounded-lg text-xs transition-all ${
                      language === 'fr'
                        ? 'font-bold bg-emerald-500 text-white shadow-sm'
                        : 'font-semibold text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    FR
                  </button>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 to-rose-500 text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-sm">
                      SW
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-slate-800 truncate">{studentProfile.name}</p>
                      <p className="text-[10px] text-slate-400 truncate">{studentProfile.email}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowProfileModal(true)}
                    className="text-slate-400 hover:text-slate-700 p-1"
                    title="Edit Profile"
                  >
                    <ChevronUp className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </aside>

            {/* CENTER PANEL: SOURCE TABS + INTERACTIVE PDF VIEWER (5 cols) */}
            <div className="lg:col-span-5 flex flex-col gap-3">
              <div className="bg-white rounded-2xl border border-slate-200/80 p-3 shadow-sm">
                <div className="grid grid-cols-3 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setActiveSourceMode('pdf')}
                    className={`py-2.5 px-3 rounded-xl font-semibold text-xs flex items-center justify-center gap-2 transition-all ${
                      activeSourceMode === 'pdf'
                        ? 'border-2 border-emerald-500 bg-emerald-50/80 text-emerald-700'
                        : 'border border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <FileText className="w-4 h-4 text-emerald-600" />
                    <span>PDF Document</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveSourceMode('youtube')}
                    className={`py-2.5 px-3 rounded-xl font-semibold text-xs flex items-center justify-center gap-2 transition-all ${
                      activeSourceMode === 'youtube'
                        ? 'border-2 border-emerald-500 bg-emerald-50/80 text-emerald-700'
                        : 'border border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <Youtube className="w-4 h-4 text-rose-500" />
                    <span>YouTube Lecture</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveSourceMode('audio')}
                    className={`py-2.5 px-3 rounded-xl font-semibold text-xs flex items-center justify-center gap-2 transition-all ${
                      activeSourceMode === 'audio'
                        ? 'border-2 border-emerald-500 bg-emerald-50/80 text-emerald-700'
                        : 'border border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <Mic className="w-4 h-4 text-slate-600" />
                    <span>Audio Source</span>
                  </button>
                </div>
                <div className="mt-3 w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-emerald-500 h-full rounded-full transition-all duration-300"
                    style={{
                      width: `${Math.round(((activeChapterIdx + 1) / activeDoc.chapters.length) * 100)}%`
                    }}
                  />
                </div>
              </div>

              {/* PDF Document Viewer Card */}
              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm flex flex-col min-h-[600px] relative overflow-hidden">
                <div className="px-4 py-3 border-b border-slate-100 flex flex-wrap items-center justify-between gap-2 bg-white sticky top-0 z-20">
                  <div className="flex items-center gap-2 min-w-0 flex-1">
                    <BookOpen className="w-4 h-4 text-emerald-600 shrink-0" />
                    <h2 className="font-bold text-sm text-slate-800 truncate">{activeDoc.title}</h2>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs">
                    <button
                      type="button"
                      onClick={() => setActiveChapterIdx((idx) => Math.max(0, idx - 1))}
                      className="w-7 h-7 rounded-lg border border-slate-200 hover:bg-slate-50 flex items-center justify-center text-slate-600"
                      title="Previous Chapter"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-2 py-1 rounded-md bg-slate-100 text-slate-700 font-semibold text-[11px]">
                      {activeChapterIdx + 1} / {activeDoc.chapters.length}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        setActiveChapterIdx((idx) => Math.min(activeDoc.chapters.length - 1, idx + 1))
                      }
                      className="w-7 h-7 rounded-lg border border-slate-200 hover:bg-slate-50 flex items-center justify-center text-slate-600"
                      title="Next Chapter"
                    >
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>

                    <div className="h-4 w-[1px] bg-slate-200 mx-1" />

                    <button
                      type="button"
                      onClick={() => setZoomLevel((z) => Math.max(80, z - 10))}
                      className="w-6 h-6 rounded hover:bg-slate-100 flex items-center justify-center text-slate-600 font-bold"
                    >
                      -
                    </button>
                    <span className="text-[11px] font-medium text-slate-500 w-9 text-center">
                      {zoomLevel}%
                    </span>
                    <button
                      type="button"
                      onClick={() => setZoomLevel((z) => Math.min(140, z + 10))}
                      className="w-6 h-6 rounded hover:bg-slate-100 flex items-center justify-center text-slate-600 font-bold"
                    >
                      +
                    </button>

                    <button
                      type="button"
                      onClick={() => setShowContextMenu((s) => !s)}
                      className="ml-1 px-2 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 text-[11px] font-semibold flex items-center gap-1"
                    >
                      <Sparkles className="w-3 h-3" />
                      <span>AI Menu</span>
                    </button>
                  </div>
                </div>

                {/* Chapter Sub-Bar */}
                <div className="px-4 py-2 bg-slate-50/80 border-b border-slate-100 flex items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider shrink-0">
                      Chapter:
                    </span>
                    <select
                      value={activeChapterIdx}
                      onChange={(e) => setActiveChapterIdx(Number(e.target.value) || 0)}
                      className="flex-1 bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-xs font-medium text-slate-700 focus:outline-none focus:border-emerald-500 truncate"
                    >
                      {activeDoc.chapters.map((ch, idx) => (
                        <option key={ch.chapterNumber} value={idx}>
                          {ch.title} (pp. {ch.pageStart}–{ch.pageEnd})
                        </option>
                      ))}
                    </select>
                  </div>
                  <span className="text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/60 hidden sm:inline-block">
                    Select any text for AI actions
                  </span>
                </div>

                {/* Viewer Content Area */}
                <div
                  onMouseUp={() => {
                    if (typeof window !== 'undefined') {
                      const sel = window.getSelection().toString().trim();
                      if (sel.length > 3) {
                        setSelectedSnippet(sel);
                        setShowContextMenu(true);
                      }
                    }
                  }}
                  className="p-5 sm:p-7 overflow-y-auto max-h-[520px] relative select-text bg-[#fcfdfd]"
                  style={{ fontSize: `${(zoomLevel / 100) * 0.96}rem` }}
                >
                  {activeSourceMode === 'pdf' && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-200 text-[11px] text-slate-400">
                        <span>
                          {activeDoc.folder} &bull; {activeDoc.title}
                        </span>
                        <span>
                          Pages {activeChapter.pageStart}–{activeChapter.pageEnd} of {activeDoc.pageCount}
                        </span>
                      </div>

                      {activeChapter.paragraphs.map((p, idx) => (
                        <div
                          key={idx}
                          className="p-3.5 rounded-xl bg-white border border-slate-200/70 shadow-2xs space-y-1.5"
                        >
                          <h4 className="font-bold text-xs uppercase tracking-wider text-rose-700">
                            {p.heading}
                          </h4>
                          <p className="text-slate-800 leading-relaxed">{p.text}</p>
                        </div>
                      ))}

                      <div className="mt-6 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs">
                        <span className="text-slate-400 text-[11px]">
                          Tip: Highlight any sentence above to open the Graspr AI Context Menu
                        </span>
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleContextAction('explain', activeChapter.title)}
                            className="px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-semibold text-[11px]"
                          >
                            Explain Chapter
                          </button>
                          <button
                            type="button"
                            onClick={() => handleContextAction('teacher', activeChapter.title)}
                            className="px-2.5 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-700 font-semibold text-[11px]"
                          >
                            What The Teacher Says
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeSourceMode === 'youtube' && (
                    <div className="space-y-4">
                      <div className="p-4 rounded-2xl bg-slate-900 text-white">
                        <div className="flex items-center gap-2 text-rose-400 text-xs font-bold uppercase">
                          <Youtube className="w-4 h-4" /> Paired Video Lecture Transcript
                        </div>
                        <h3 className="text-base font-bold mt-1">{activeDoc.youtubeTitle}</h3>
                        <p className="text-xs text-slate-300 mt-1">
                          Synchronized with {activeChapter.title} (Pages {activeChapter.pageStart}–
                          {activeChapter.pageEnd})
                        </p>
                      </div>
                      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2 text-slate-700">
                        <p>
                          <strong>[00:45] Instructor:</strong> &ldquo;Let&apos;s connect the textbook
                          definition on Page {activeChapter.pageStart} to exam problem-solving:{' '}
                          {activeChapter.summary.overview}&rdquo;
                        </p>
                        <p>
                          <strong>[04:12] Key Takeaway:</strong> &ldquo;
                          {activeChapter.summary.teacherTip}&rdquo;
                        </p>
                      </div>
                    </div>
                  )}

                  {activeSourceMode === 'audio' && (
                    <div className="space-y-4">
                      <div className="p-4 rounded-2xl bg-emerald-950 text-white">
                        <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase">
                          <Mic className="w-4 h-4" /> Lecture Audio Source &amp; Voice Notes
                        </div>
                        <h3 className="text-base font-bold mt-1">{activeDoc.audioTitle}</h3>
                        <p className="text-xs text-emerald-200 mt-1">
                          Extracted classroom audio transcript indexed into RAG memory
                        </p>
                      </div>
                      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2 text-slate-700">
                        {activeChapter.podcastDialogue.map((d, i) => (
                          <p key={i}>
                            <strong>{d.speaker}:</strong> &ldquo;{d.text}&rdquo;
                          </p>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* FLOATING AI CONTEXT MENU (Matches Screenshot) */}
                {showContextMenu && (
                  <div className="absolute left-10 top-36 z-30 w-56 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-slate-200/90 p-1.5 text-xs text-slate-700">
                    <div className="px-2.5 py-1.5 border-b border-slate-100 flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 flex items-center gap-1">
                        <Wand2 className="w-3 h-3" /> AI Selection Actions
                      </span>
                      <button
                        type="button"
                        onClick={() => setShowContextMenu(false)}
                        className="text-slate-400 hover:text-slate-600"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="py-1 space-y-0.5">
                      <button
                        type="button"
                        onClick={() => handleContextAction('explain')}
                        className="w-full px-3 py-2 rounded-xl hover:bg-emerald-50 hover:text-emerald-700 flex items-center gap-2.5 font-medium text-left"
                      >
                        <MessageSquareCode className="w-4 h-4 text-emerald-600" />
                        <span>Explain</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleContextAction('summarize')}
                        className="w-full px-3 py-2 rounded-xl hover:bg-emerald-50 hover:text-emerald-700 flex items-center gap-2.5 font-medium text-left"
                      >
                        <FileText className="w-4 h-4 text-emerald-600" />
                        <span>Summarize</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleContextAction('flashcard')}
                        className="w-full px-3 py-2 rounded-xl hover:bg-emerald-50 hover:text-emerald-700 flex items-center gap-2.5 font-medium text-left"
                      >
                        <Layers className="w-4 h-4 text-emerald-600" />
                        <span>Flashcard</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleContextAction('chat')}
                        className="w-full px-3 py-2 rounded-xl hover:bg-emerald-50 hover:text-emerald-700 flex items-center gap-2.5 font-medium text-left"
                      >
                        <MessageCircle className="w-4 h-4 text-emerald-600" />
                        <span>Chat</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleContextAction('notes')}
                        className="w-full px-3 py-2 rounded-xl hover:bg-emerald-50 hover:text-emerald-700 flex items-center gap-2.5 font-medium text-left"
                      >
                        <NotebookPen className="w-4 h-4 text-emerald-600" />
                        <span>Add to Notes</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleContextAction('hyperlink')}
                        className="w-full px-3 py-2 rounded-xl hover:bg-emerald-50 hover:text-emerald-700 flex items-center gap-2.5 font-medium text-left"
                      >
                        <Link2 className="w-4 h-4 text-emerald-600" />
                        <span>Create Hyperlink</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleContextAction('teacher')}
                        className="w-full px-3 py-2 rounded-xl hover:bg-amber-50 hover:text-amber-700 flex items-center gap-2.5 font-medium text-left border-t border-slate-100 mt-1 pt-2"
                      >
                        <GraduationCap className="w-4 h-4 text-amber-600" />
                        <span>What The Teacher Say</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT PANEL: 6 AI WORKSPACE TABS (5 cols) */}
            <div className="lg:col-span-5 flex flex-col gap-3">
              <div className="bg-white rounded-2xl border border-slate-200/80 p-3 shadow-sm">
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'chat', label: dict.tabChat, icon: MessageCircle },
                    { id: 'notes', label: dict.tabNotes, icon: NotebookPen },
                    { id: 'quiz', label: dict.tabQuiz, icon: Lightbulb },
                    { id: 'summarize', label: dict.tabSummarize, icon: FileCheck2 },
                    { id: 'podcast', label: dict.tabPodcast, icon: Headphones },
                    { id: 'flashcards', label: dict.tabFlashcards, icon: Copy }
                  ].map((tab) => {
                    const TabIcon = tab.icon;
                    const isActive = activeRightTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setActiveRightTab(tab.id)}
                        className={`py-2.5 px-3 rounded-xl font-semibold text-xs flex items-center justify-center gap-2 transition-all ${
                          isActive
                            ? 'bg-emerald-500 text-white shadow-sm'
                            : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200/70'
                        }`}
                      >
                        <TabIcon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-emerald-600'}`} />
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm flex flex-col min-h-[565px] overflow-hidden">
                {/* TAB 1: RAG CHAT */}
                {activeRightTab === 'chat' && (
                  <div className="flex-1 flex flex-col justify-between p-4">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                      <div className="flex items-center gap-2">
                        <MessagesSquare className="w-4 h-4 text-emerald-600" />
                        <h3 className="font-bold text-sm text-slate-800">Document-Grounded AI Chat (RAG)</h3>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                          Strict Grounding ON
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            setConversations((prev) => ({ ...prev, [activeDoc.id]: [] }));
                            triggerToast('Cleared conversation thread');
                          }}
                          className="text-xs text-slate-400 hover:text-slate-600 p-1"
                          title="Reset Chat"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="flex-1 overflow-y-auto max-h-[395px] py-4 space-y-3 pr-1">
                      <div className="text-center py-2">
                        <div className="w-12 h-12 rounded-full bg-slate-50 border border-slate-200/80 mx-auto mb-2 flex items-center justify-center text-slate-900 shadow-xs">
                          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M11 2.5L4 7v10l7 4.5V2.5zm2 0v19l7-4.5V7l-7-4.5z" />
                          </svg>
                        </div>
                        <h4 className="font-bold text-sm text-slate-900">Graspr AI</h4>
                        <p className="text-xs text-slate-500 mt-0.5 mb-3">
                          Click an example question or ask anything grounded in your uploaded PDF.
                        </p>
                        <div className="grid grid-cols-2 gap-2 text-left">
                          {activeDoc.starterPrompts.map((prompt, i) => (
                            <button
                              key={i}
                              type="button"
                              onClick={() => handleAskQuestion(prompt)}
                              className="p-2.5 rounded-xl bg-slate-50/90 hover:bg-emerald-50/70 border border-slate-200/80 hover:border-emerald-300 text-xs text-slate-600 hover:text-slate-900 transition-all text-left leading-relaxed"
                            >
                              {prompt}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-3">
                        {(conversations[activeDoc.id] || []).map((m, idx) =>
                          m.role === 'user' ? (
                            <div key={idx} className="flex justify-end">
                              <div className="max-w-[85%] px-3.5 py-2.5 rounded-2xl bg-emerald-500 text-white text-xs font-medium shadow-xs">
                                {m.content}
                              </div>
                            </div>
                          ) : (
                            <div key={idx} className="flex justify-start">
                              <div className="max-w-[92%] p-3.5 rounded-2xl bg-slate-50 border border-slate-200/90 text-xs text-slate-800 leading-relaxed space-y-1.5">
                                <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                                  <ShieldCheck className="w-3.5 h-3.5" /> Grounded PDF Response
                                </div>
                                <p>{m.content}</p>
                                {m.citations && m.citations.length > 0 && (
                                  <div className="pt-1 border-t border-slate-200/70 flex flex-wrap gap-1">
                                    {m.citations.map((c, cIdx) => (
                                      <button
                                        key={cIdx}
                                        type="button"
                                        onClick={() => {
                                          const chIdx = activeDoc.chapters.findIndex(
                                            (ch) => c.page >= ch.pageStart && c.page <= ch.pageEnd
                                          );
                                          if (chIdx >= 0) setActiveChapterIdx(chIdx);
                                          triggerToast(`Jumped to PDF Page ${c.page}`);
                                        }}
                                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-100 hover:bg-emerald-200 text-emerald-800 font-semibold text-[10px]"
                                      >
                                        <BookOpenCheck className="w-3 h-3" /> {c.label}
                                      </button>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>

                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleAskQuestion(chatInput);
                        setChatInput('');
                      }}
                      className="pt-3 border-t border-slate-100 flex items-center gap-2"
                    >
                      <input
                        type="text"
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        placeholder="Reply or ask any question from this PDF..."
                        className="flex-1 px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-xs flex items-center gap-1.5 shadow-sm transition-all shrink-0"
                      >
                        <span>Send</span>
                        <Send className="w-3.5 h-3.5" />
                      </button>
                    </form>
                  </div>
                )}

                {/* TAB 2: SUMMARIZE */}
                {activeRightTab === 'summarize' && (
                  <div className="flex-1 flex flex-col p-4">
                    <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
                      <div>
                        <h3 className="font-bold text-sm text-slate-800 flex items-center gap-1.5">
                          <Sparkles className="w-4 h-4 text-emerald-600" />
                          <span>Chapter-Wise Revision Summary</span>
                        </h3>
                        <p className="text-[11px] text-slate-500">
                          {activeChapter.title} (Pages {activeChapter.pageStart}–{activeChapter.pageEnd})
                        </p>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => triggerToast('Regenerated grounded chapter summary!')}
                          className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium flex items-center gap-1"
                        >
                          <RefreshCw className="w-3.5 h-3.5" />
                          <span>Regenerate</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setSavedSummaries((prev) => [
                              {
                                id: 'sum-' + Date.now(),
                                docTitle: activeDoc.title,
                                chapterTitle: activeChapter.title,
                                date: 'Nov 03',
                                keyCount: activeChapter.summary.keyConcepts.length
                              },
                              ...prev
                            ]);
                            triggerToast(`Saved "${activeChapter.title}" summary to Study History!`);
                          }}
                          className="px-2.5 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-semibold flex items-center gap-1"
                        >
                          <BookmarkCheck className="w-3.5 h-3.5" />
                          <span>Save Summary</span>
                        </button>
                      </div>
                    </div>

                    <div className="flex-1 overflow-y-auto max-h-[470px] py-3 space-y-4 pr-1">
                      <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200/80 text-xs leading-relaxed text-slate-800">
                        <div className="font-bold text-emerald-800 uppercase text-[10px] tracking-wider mb-1">
                          Executive Chapter Overview
                        </div>
                        <p>{activeChapter.summary.overview}</p>
                      </div>

                      <div>
                        <h4 className="font-bold text-xs text-slate-800 uppercase tracking-wider mb-2">
                          Key Concepts Extracted
                        </h4>
                        <div className="flex flex-wrap gap-1.5">
                          {activeChapter.summary.keyConcepts.map((c, i) => (
                            <span
                              key={i}
                              className="px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200 text-slate-700 text-xs font-medium"
                            >
                              {c}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-bold text-xs text-slate-800 uppercase tracking-wider mb-2">
                          Important Definitions
                        </h4>
                        <div className="space-y-2">
                          {activeChapter.summary.definitions.map((d, i) => (
                            <div
                              key={i}
                              className="p-3 rounded-xl bg-white border border-slate-200 text-xs"
                            >
                              <span className="font-bold text-emerald-700">{d.term}:</span>
                              <span className="text-slate-600 ml-1">{d.definition}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-bold text-xs text-slate-800 uppercase tracking-wider mb-2">
                          High-Yield Revision Notes
                        </h4>
                        <ul className="space-y-1.5 text-xs text-slate-700">
                          {activeChapter.summary.revisionNotes.map((n, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                              <span>{n}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900">
                        <div className="font-bold uppercase text-[10px] tracking-wider text-amber-700 mb-1 flex items-center gap-1">
                          <GraduationCap className="w-3.5 h-3.5" /> What The Teacher Says (Exam Alert)
                        </div>
                        <p>{activeChapter.summary.teacherTip}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 3: QUIZ YOURSELF */}
                {activeRightTab === 'quiz' && (
                  <div className="flex-1 flex flex-col p-4">
                    <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
                      <div>
                        <h3 className="font-bold text-sm text-slate-800 flex items-center gap-1.5">
                          <HelpCircle className="w-4 h-4 text-emerald-600" />
                          <span>AI Practice Quiz Generator</span>
                        </h3>
                        <p className="text-[11px] text-slate-500">
                          4-option MCQs with instant explanations &amp; score tracking
                        </p>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <select
                          value={quizDifficulty}
                          onChange={(e) => setQuizDifficulty(e.target.value)}
                          className="text-xs border border-slate-200 rounded-lg px-2 py-1 bg-slate-50 font-medium text-slate-700 focus:outline-none"
                        >
                          <option value="All">All Difficulties</option>
                          <option value="Easy">Easy</option>
                          <option value="Medium">Medium</option>
                          <option value="Hard">Hard</option>
                        </select>
                        <button
                          type="button"
                          onClick={() => {
                            setWorkspaceQuizAnswers({});
                            triggerToast('Reset quiz options for a fresh practice attempt');
                          }}
                          className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 text-xs font-semibold"
                        >
                          New Attempt
                        </button>
                      </div>
                    </div>

                    <div className="my-2.5 px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-700">
                        Answered: {workspaceQuizStats.answered} / {workspaceQuizStats.total}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-emerald-700">
                          Score: {workspaceQuizStats.pct}% ({workspaceQuizStats.correct}/
                          {workspaceQuizStats.answered || 0})
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            const total = Math.max(workspaceQuizStats.answered, 1);
                            const pct = Math.round((workspaceQuizStats.correct / total) * 100);
                            setQuizAttempts((prev) => [
                              ...prev,
                              {
                                id: 'att-' + Date.now(),
                                docId: activeDoc.id,
                                docTitle: activeDoc.title,
                                chapterTitle: activeChapter.title,
                                score: workspaceQuizStats.correct,
                                total,
                                percentage: pct,
                                difficulty: quizDifficulty,
                                date: 'Nov 03'
                              }
                            ]);
                            triggerToast(`Saved Quiz Attempt (${pct}%) to Progress Dashboard!`);
                          }}
                          className="px-2.5 py-1 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-[11px]"
                        >
                          Save Score to History
                        </button>
                      </div>
                    </div>

                    <div className="flex-1 overflow-y-auto max-h-[415px] space-y-3 pr-1">
                      {workspaceQuestions.map((q, idx) => {
                        const chosen = workspaceQuizAnswers[q.id];
                        const isAnswered = chosen !== undefined;
                        return (
                          <div
                            key={q.id}
                            className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2.5 text-xs"
                          >
                            <div className="flex items-center justify-between gap-2">
                              <span className="font-bold text-slate-900">
                                Q{idx + 1}. {q.questionText}
                              </span>
                              <span
                                className={`px-2 py-0.5 rounded text-[10px] font-bold shrink-0 ${
                                  q.difficulty === 'Easy'
                                    ? 'bg-emerald-100 text-emerald-800'
                                    : q.difficulty === 'Medium'
                                    ? 'bg-amber-100 text-amber-800'
                                    : 'bg-rose-100 text-rose-800'
                                }`}
                              >
                                {q.difficulty}
                              </span>
                            </div>
                            <div className="space-y-1.5">
                              {q.options.map((opt, oIdx) => {
                                let btnStyle =
                                  'bg-white hover:bg-slate-100 border-slate-200 text-slate-700';
                                if (isAnswered) {
                                  if (oIdx === q.correctOptionIndex) {
                                    btnStyle =
                                      'bg-emerald-50 border-emerald-500 text-emerald-900 font-semibold';
                                  } else if (oIdx === chosen) {
                                    btnStyle = 'bg-rose-50 border-rose-400 text-rose-900';
                                  }
                                }
                                return (
                                  <button
                                    key={oIdx}
                                    type="button"
                                    onClick={() =>
                                      setWorkspaceQuizAnswers((prev) => ({ ...prev, [q.id]: oIdx }))
                                    }
                                    className={`w-full text-left px-3 py-2 rounded-lg border transition-all flex items-center justify-between ${btnStyle}`}
                                  >
                                    <span>
                                      <strong>{String.fromCharCode(65 + oIdx)}.</strong> {opt}
                                    </span>
                                    {isAnswered && oIdx === q.correctOptionIndex && (
                                      <span className="text-emerald-600 font-bold">✓</span>
                                    )}
                                    {isAnswered &&
                                      oIdx === chosen &&
                                      oIdx !== q.correctOptionIndex && (
                                        <span className="text-rose-600 font-bold">✗</span>
                                      )}
                                  </button>
                                );
                              })}
                            </div>
                            {isAnswered && (
                              <div className="p-2.5 rounded-lg bg-white border border-slate-200 text-[11px] text-slate-600">
                                <strong className="text-emerald-700">
                                  Explanation (Page {q.pageReference}):
                                </strong>{' '}
                                {q.explanation}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* TAB 4: NOTE-TAKING */}
                {activeRightTab === 'notes' && (
                  <div className="flex-1 flex flex-col p-4">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                      <div>
                        <h3 className="font-bold text-sm text-slate-800 flex items-center gap-1.5">
                          <NotebookPen className="w-4 h-4 text-emerald-600" />
                          <span>Smart Study Notes &amp; Saved Highlights</span>
                        </h3>
                        <p className="text-[11px] text-slate-500">
                          Select text in the PDF or add custom revision notes below
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          const docNotes = notes.filter((n) => n.docId === activeDoc.id);
                          const md =
                            `# Study Notes — ${activeDoc.title}\n\n` +
                            docNotes
                              .map((n) => `- **[${n.tag} | Page ${n.page}]** ${n.text}`)
                              .join('\n');
                          const blob = new Blob([md], { type: 'text/markdown' });
                          const url = URL.createObjectURL(blob);
                          const a = document.createElement('a');
                          a.href = url;
                          a.download = `${activeDoc.title
                            .toLowerCase()
                            .replace(/[^a-z0-9]+/g, '_')}_notes.md`;
                          a.click();
                          URL.revokeObjectURL(url);
                          triggerToast('Exported Markdown study notes!');
                        }}
                        className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Export .MD</span>
                      </button>
                    </div>

                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        if (!newNoteText.trim()) return;
                        setNotes((prev) => [
                          {
                            id: 'n-' + Date.now(),
                            docId: activeDoc.id,
                            tag: newNoteTag,
                            text: newNoteText.trim(),
                            page: activeChapter.pageStart
                          },
                          ...prev
                        ]);
                        setNewNoteText('');
                        triggerToast('Added study note!');
                      }}
                      className="my-3 flex gap-2"
                    >
                      <input
                        type="text"
                        value={newNoteText}
                        onChange={(e) => setNewNoteText(e.target.value)}
                        placeholder="Write a key takeaway, formula, or exam reminder..."
                        className="flex-1 px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500"
                      />
                      <select
                        value={newNoteTag}
                        onChange={(e) => setNewNoteTag(e.target.value)}
                        className="px-2 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 text-slate-700"
                      >
                        <option value="Concept">Concept</option>
                        <option value="Formula">Formula</option>
                        <option value="Exam Tip">Exam Tip</option>
                      </select>
                      <button
                        type="submit"
                        className="px-3 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-semibold shrink-0"
                      >
                        + Add
                      </button>
                    </form>

                    <div className="flex-1 overflow-y-auto max-h-[400px] space-y-2.5 pr-1">
                      {notes
                        .filter((n) => n.docId === activeDoc.id)
                        .map((n) => (
                          <div
                            key={n.id}
                            className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1"
                          >
                            <div className="flex items-center justify-between">
                              <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                                {n.tag}
                              </span>
                              <span className="text-[10px] text-slate-400">Page {n.page}</span>
                            </div>
                            <p className="text-slate-700 leading-relaxed">{n.text}</p>
                          </div>
                        ))}
                    </div>
                  </div>
                )}

                {/* TAB 5: PODCAST (TTS) */}
                {activeRightTab === 'podcast' && (
                  <div className="flex-1 flex flex-col p-4">
                    <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
                      <div>
                        <h3 className="font-bold text-sm text-slate-800 flex items-center gap-1.5">
                          <Radio className="w-4 h-4 text-emerald-600" />
                          <span>AI Study Podcast &amp; Audio Summary</span>
                        </h3>
                        <p className="text-[11px] text-slate-500">
                          Listen to a conversational breakdown of the current chapter
                        </p>
                      </div>
                      <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {ttsStatus}
                      </span>
                    </div>

                    <div className="my-3 p-4 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 text-white shadow-md">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <span className="text-[10px] uppercase tracking-wider font-bold text-emerald-400">
                            Deep-Dive Audio Episode
                          </span>
                          <h4 className="font-bold text-sm mt-0.5">{activeChapter.title}</h4>
                          <p className="text-[11px] text-slate-300 mt-0.5">
                            Host Alex &amp; Prof. Sophia Williams
                          </p>
                        </div>
                        <div
                          className={`flex items-end gap-1 h-8 px-2 transition-opacity ${
                            isSpeaking ? 'opacity-100' : 'opacity-40'
                          }`}
                        >
                          <span className="w-1 bg-emerald-400 h-4 rounded-full" />
                          <span className="w-1 bg-emerald-400 h-7 rounded-full" />
                          <span className="w-1 bg-emerald-400 h-5 rounded-full" />
                          <span className="w-1 bg-emerald-400 h-8 rounded-full" />
                          <span className="w-1 bg-emerald-400 h-6 rounded-full" />
                        </div>
                      </div>

                      <div className="mt-4 flex items-center justify-between gap-2 pt-3 border-t border-white/10">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={handlePlayPodcast}
                            className="px-3.5 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-colors"
                          >
                            <Play className="w-3.5 h-3.5" />
                            <span>Play Audio (TTS)</span>
                          </button>
                          <button
                            type="button"
                            onClick={handleStopPodcast}
                            className="px-2.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-medium"
                          >
                            Stop
                          </button>
                        </div>
                        <div className="flex items-center gap-1 text-xs">
                          <span className="text-slate-400 text-[11px]">Speed:</span>
                          <select
                            value={podcastSpeed}
                            onChange={(e) => setPodcastSpeed(e.target.value)}
                            className="bg-white/10 text-white rounded-lg px-2 py-1 text-xs border border-white/15 focus:outline-none"
                          >
                            <option value="1" className="text-slate-900">
                              1.0x
                            </option>
                            <option value="1.25" className="text-slate-900">
                              1.25x
                            </option>
                            <option value="1.5" className="text-slate-900">
                              1.5x
                            </option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="flex-1 overflow-y-auto max-h-[310px] space-y-2.5 pr-1">
                      {(activeChapter.podcastDialogue || []).map((line, idx) => (
                        <div
                          key={idx}
                          className={`p-3 rounded-xl border text-xs ${
                            line.speaker.includes('Prof')
                              ? 'bg-emerald-50/60 border-emerald-200'
                              : 'bg-slate-50 border-slate-200'
                          }`}
                        >
                          <span
                            className={`font-bold ${
                              line.speaker.includes('Prof') ? 'text-emerald-800' : 'text-slate-800'
                            }`}
                          >
                            {line.speaker}:
                          </span>
                          <p className="text-slate-700 mt-0.5 leading-relaxed">{line.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* TAB 6: FLASHCARDS */}
                {activeRightTab === 'flashcards' && (
                  <div className="flex-1 flex flex-col justify-between p-4">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                      <div>
                        <h3 className="font-bold text-sm text-slate-800 flex items-center gap-1.5">
                          <Layers className="w-4 h-4 text-emerald-600" />
                          <span>Active Recall Flashcards</span>
                        </h3>
                        <p className="text-[11px] text-slate-500">
                          Click card to flip between concept prompt and grounded answer
                        </p>
                      </div>
                      <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200">
                        Card {(flashcardIdx % allDocFlashcards.length) + 1} / {allDocFlashcards.length}
                      </span>
                    </div>

                    <div className="my-auto py-4">
                      <button
                        type="button"
                        onClick={() => setIsFlashcardFlipped((f) => !f)}
                        className={`w-full h-64 rounded-2xl p-6 flex flex-col justify-between shadow-sm transition-all text-center cursor-pointer ${
                          isFlashcardFlipped
                            ? 'bg-slate-900 text-white border-2 border-emerald-500'
                            : 'bg-gradient-to-br from-emerald-50/80 via-white to-teal-50/60 border-2 border-emerald-200 text-slate-800'
                        }`}
                      >
                        <div className="flex items-center justify-between w-full text-[11px] font-semibold">
                          <span
                            className={
                              isFlashcardFlipped
                                ? 'text-emerald-400 uppercase tracking-wider'
                                : 'text-emerald-700 uppercase tracking-wider'
                            }
                          >
                            {isFlashcardFlipped ? 'VERIFIED ANSWER' : 'QUESTION / CONCEPT'}
                          </span>
                          <span className={isFlashcardFlipped ? 'text-emerald-300' : 'text-emerald-700'}>
                            {isFlashcardFlipped
                              ? `Page ${currentFlashcard.page}`
                              : 'Click to Flip ↻'}
                          </span>
                        </div>
                        <p className="text-base sm:text-lg font-bold my-auto px-2 leading-relaxed">
                          {isFlashcardFlipped ? currentFlashcard.back : currentFlashcard.front}
                        </p>
                        <div
                          className={`text-center w-full text-[11px] ${
                            isFlashcardFlipped ? 'text-emerald-300' : 'text-slate-400'
                          }`}
                        >
                          {isFlashcardFlipped
                            ? 'Click card to flip back'
                            : 'Grounded in current document chapter'}
                        </div>
                      </button>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setFlashcardIdx(
                            (i) => (i - 1 + allDocFlashcards.length) % allDocFlashcards.length
                          );
                          setIsFlashcardFlipped(false);
                        }}
                        className="px-3 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 flex items-center gap-1"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" /> Prev
                      </button>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => triggerToast('Flagged card for spaced-repetition review')}
                          className="px-3 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 text-xs font-semibold"
                        >
                          Need Review
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setFlashcardIdx((i) => (i + 1) % allDocFlashcards.length);
                            setIsFlashcardFlipped(false);
                            triggerToast('Marked card as Mastered!');
                          }}
                          className="px-3 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-semibold"
                        >
                          Got It ✓
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setFlashcardIdx((i) => (i + 1) % allDocFlashcards.length);
                          setIsFlashcardFlipped(false);
                        }}
                        className="px-3 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 flex items-center gap-1"
                      >
                        Next <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* ===================================================================
            VIEW 2: STAGE 1 — UPLOAD PDF & EXTRACTION PIPELINE
            =================================================================== */}
        {activeNav === 'upload' && (
          <section className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm">
              <div className="max-w-3xl mx-auto text-center">
                <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Stage 1 — Foundation &amp; Ingestion
                </span>
                <h2 className="text-2xl font-bold text-slate-900 mt-2">
                  Upload Academic PDF &amp; Extract Structured Chapters
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  Upload any digital textbook, lecture slides, or research paper (`.pdf` up to 25 MB).
                  Extracts page-indexed text, splits chapters, and generates summaries, MCQs, and RAG
                  chunks automatically.
                </p>
              </div>

              <div className="max-w-2xl mx-auto mt-6">
                <label className="flex flex-col items-center justify-center border-2 border-dashed border-emerald-300 hover:border-emerald-500 rounded-2xl p-8 bg-emerald-50/30 hover:bg-emerald-50/60 transition-all cursor-pointer text-center">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-sm mb-3">
                    <UploadCloud className="w-7 h-7" />
                  </div>
                  <p className="font-bold text-base text-slate-800">
                    Click to select a PDF file or drag and drop here
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Validates `.pdf` format &bull; Max file size 25 MB &bull; Extracts page numbers
                    &amp; chapter boundaries
                  </p>
                  <input
                    type="file"
                    accept="application/pdf,.pdf"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        handleFileUpload(e.target.files[0]);
                      }
                    }}
                    className="hidden"
                  />
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Custom Document Title
                    </label>
                    <input
                      type="text"
                      value={uploadTitle}
                      onChange={(e) => setUploadTitle(e.target.value)}
                      placeholder="e.g., Operating Systems Notes"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Course Folder
                    </label>
                    <select
                      value={uploadFolder}
                      onChange={(e) => setUploadFolder(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-emerald-500"
                    >
                      <option value="CHAM 1802">CHAM 1802 (Chemistry)</option>
                      <option value="CS 301">CS 301 (Networks)</option>
                      <option value="CS 405">CS 405 (AI &amp; ML)</option>
                    </select>
                  </div>
                  <div className="flex items-end">
                    <label className="flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 w-full cursor-pointer text-xs font-medium text-slate-700">
                      <input
                        type="checkbox"
                        checked={ocrFallback}
                        onChange={(e) => setOcrFallback(e.target.checked)}
                        className="rounded text-emerald-600 focus:ring-emerald-500"
                      />
                      <span>Enable OCR Fallback (Scanned PDFs)</span>
                    </label>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs">
                  <span className="text-slate-500">
                    Don&apos;t have a PDF handy right now? Simulate a full pipeline upload:
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      const sampleText =
                        'Database Management Systems (DBMS): Normalization (1NF, 2NF, 3NF, BCNF) eliminates data redundancy and insertion/update/deletion anomalies. ACID transactions guarantee Atomicity, Consistency, Isolation, and Durability using Write-Ahead Logging (WAL) and Two-Phase Locking (2PL). B+ Trees provide O(log n) indexed range queries.';
                      handleFileUpload(
                        {
                          name: 'DBMS_Normalization_and_ACID_Notes.pdf',
                          type: 'application/pdf',
                          size: 1024 * 450
                        },
                        sampleText
                      );
                    }}
                    className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-emerald-600 text-white font-semibold transition-colors flex items-center gap-1.5"
                  >
                    <Zap className="w-3.5 h-3.5" />
                    <span>Simulate Upload: &ldquo;DBMS Notes.pdf&rdquo;</span>
                  </button>
                </div>
              </div>

              {uploadStatus && (
                <div className="max-w-3xl mx-auto mt-6 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-emerald-700">
                      Processed {uploadStatus.fileName}
                    </span>
                    <span className="text-xs font-bold text-slate-700">{uploadStatus.percent}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden mb-3">
                    <div
                      className="h-full bg-emerald-500 transition-all duration-300"
                      style={{ width: `${uploadStatus.percent}%` }}
                    />
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px] text-slate-600">
                    {uploadStatus.steps.map((s, i) => (
                      <div
                        key={i}
                        className="p-2 rounded-lg bg-white border border-slate-200 text-emerald-700 font-medium"
                      >
                        ✓ {s}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* ===================================================================
            VIEW 3: STAGE 5 — PROGRESS DASHBOARD & ANALYTICS
            =================================================================== */}
        {activeNav === 'dashboard' && (
          <section className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-slate-500">Uploaded Study PDFs</p>
                  <p className="text-2xl font-extrabold text-slate-900 mt-1">{documents.length}</p>
                  <p className="text-[11px] text-emerald-600 font-medium mt-1">
                    All indexed for RAG Q&amp;A
                  </p>
                </div>
                <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <Files className="w-5 h-5" />
                </div>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-slate-500">Chapter Summaries Saved</p>
                  <p className="text-2xl font-extrabold text-slate-900 mt-1">
                    {Math.max(
                      savedSummaries.length,
                      documents.reduce((acc, d) => acc + d.chapters.length, 0)
                    )}
                  </p>
                  <p className="text-[11px] text-emerald-600 font-medium mt-1">
                    100% chapter coverage
                  </p>
                </div>
                <div className="w-11 h-11 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center">
                  <BookCheck className="w-5 h-5" />
                </div>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-slate-500">Average Quiz Accuracy</p>
                  <p className="text-2xl font-extrabold text-emerald-600 mt-1">
                    {averageQuizScore}%
                  </p>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Across {quizAttempts.length} completed attempts
                  </p>
                </div>
                <div className="w-11 h-11 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
                  <Trophy className="w-5 h-5" />
                </div>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-slate-500">Grounded RAG Queries</p>
                  <p className="text-2xl font-extrabold text-slate-900 mt-1">14</p>
                  <p className="text-[11px] text-emerald-600 font-medium mt-1">
                    With verified page citations
                  </p>
                </div>
                <div className="w-11 h-11 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <MessageSquareQuote className="w-5 h-5" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
              <div className="lg:col-span-7 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-sm text-slate-900">
                      Quiz Score Progression &amp; Mastery Trend
                    </h3>
                    <p className="text-xs text-slate-500">
                      Tracks every interactive quiz attempt across your uploaded PDFs
                    </p>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700">
                    Target: 85%+
                  </span>
                </div>
                <div className="relative h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={quizAttempts.map((a, i) => ({
                        name: `Attempt ${i + 1} (${a.date})`,
                        score: a.percentage
                      }))}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                      <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} />
                      <Tooltip />
                      <Area
                        type="monotone"
                        dataKey="score"
                        stroke="#10b981"
                        fill="#a7f3d0"
                        strokeWidth={2.5}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="lg:col-span-5 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                      <Flame className="w-4 h-4 text-amber-500" />
                      <span>Weak-Topic Identification &amp; Study Plan</span>
                    </h3>
                    <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                      AI Diagnostic
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mb-3">
                    Topics flagged from missed MCQ questions or lower confidence ratings:
                  </p>
                  <div className="space-y-2.5">
                    <div className="p-3 rounded-xl bg-amber-50/80 border border-amber-200 flex items-center justify-between text-xs">
                      <div>
                        <span className="font-bold text-amber-900">
                          1. Polyatomic Dipole Vectors (NH3 vs NF3)
                        </span>
                        <p className="text-[11px] text-amber-700">
                          CHAM 1802 &bull; Accuracy: 75% &bull; Review Page 3 Flashcards
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setActiveDocId('doc-chem-1802');
                          setActiveNav('workspace');
                        }}
                        className="px-2.5 py-1 rounded-lg bg-white border border-amber-300 text-amber-800 font-semibold text-[11px] shrink-0"
                      >
                        Revise Now
                      </button>
                    </div>
                    <div className="p-3 rounded-xl bg-emerald-50/80 border border-emerald-200 flex items-center justify-between text-xs">
                      <div>
                        <span className="font-bold text-emerald-900">
                          2. VSEPR Lone-Pair Angle Compression
                        </span>
                        <p className="text-[11px] text-emerald-700">
                          CHAM 1802 &bull; Accuracy: 80% &bull; Practice Hard MCQs
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setActiveDocId('doc-chem-1802');
                          setActiveRightTab('quiz');
                          setActiveNav('workspace');
                        }}
                        className="px-2.5 py-1 rounded-lg bg-white border border-emerald-300 text-emerald-800 font-semibold text-[11px] shrink-0"
                      >
                        Practice
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div className="text-xs">
                    <span className="text-slate-500">Upcoming Exam Date:</span>
                    <input
                      type="date"
                      value={examDate}
                      onChange={(e) => setExamDate(e.target.value)}
                      className="ml-1 border border-slate-200 rounded-lg px-2 py-1 text-xs font-semibold text-slate-700"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const diffDays = Math.max(
                        1,
                        Math.ceil(
                          (new Date(examDate) - new Date('2026-11-03')) / (1000 * 60 * 60 * 24)
                        )
                      );
                      setExamDaysLeft(diffDays);
                      triggerToast(`Updated Personalized Study Plan (${diffDays} days until exam)`);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-emerald-600 text-white text-xs font-semibold transition-colors"
                  >
                    Refresh Plan
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-sm text-slate-900">
                  Document Library &amp; Mastery Overview
                </h3>
                <button
                  type="button"
                  onClick={() => setActiveNav('upload')}
                  className="px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-semibold flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" /> Upload New PDF
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-500 uppercase text-[11px]">
                      <th className="py-2.5 px-3">Document Title</th>
                      <th className="py-2.5 px-3">Course Folder</th>
                      <th className="py-2.5 px-3">Chapters / Pages</th>
                      <th className="py-2.5 px-3">Latest Quiz Score</th>
                      <th className="py-2.5 px-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {documents.map((d) => {
                      const docAttempts = quizAttempts.filter((a) => a.docId === d.id);
                      const latestPct = docAttempts.length
                        ? `${docAttempts[docAttempts.length - 1].percentage}%`
                        : 'Not Attempted';
                      return (
                        <tr key={d.id} className="hover:bg-slate-50">
                          <td className="py-3 px-3 font-semibold text-slate-800">{d.title}</td>
                          <td className="py-3 px-3">
                            <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium">
                              {d.folder}
                            </span>
                          </td>
                          <td className="py-3 px-3 text-slate-600">
                            {d.chapters.length} Chapters ({d.pageCount} pages)
                          </td>
                          <td className="py-3 px-3 font-bold text-emerald-700">{latestPct}</td>
                          <td className="py-3 px-3 text-right">
                            <button
                              type="button"
                              onClick={() => {
                                setActiveDocId(d.id);
                                setActiveNav('workspace');
                              }}
                              className="px-3 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-semibold"
                            >
                              Open Workspace
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        {/* ===================================================================
            VIEW 4: STAGE 3 — FULL-SCREEN QUIZ CENTER
            =================================================================== */}
        {activeNav === 'quizcenter' && (
          <section className="space-y-5">
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600">
                    Stage 3 — Assessment &amp; Active Recall
                  </span>
                  <h2 className="text-lg font-bold text-slate-900">
                    Interactive Exam Revision &amp; MCQ Practice Center
                  </h2>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <select
                    value={fullQuizDocId}
                    onChange={(e) => setFullQuizDocId(e.target.value)}
                    className="text-xs border border-slate-200 rounded-xl px-3 py-2 bg-slate-50 font-semibold text-slate-700"
                  >
                    {documents.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.title}
                      </option>
                    ))}
                  </select>
                  <select
                    value={fullQuizDiff}
                    onChange={(e) => setFullQuizDiff(e.target.value)}
                    className="text-xs border border-slate-200 rounded-xl px-3 py-2 bg-slate-50 font-semibold text-slate-700"
                  >
                    <option value="All">All Difficulty Levels</option>
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                  <button
                    type="button"
                    onClick={() => {
                      setFullQuizAnswers({});
                      triggerToast('Generated fresh quiz session!');
                    }}
                    className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold shadow-sm"
                  >
                    Generate Fresh Quiz
                  </button>
                </div>
              </div>

              <div className="mt-4 space-y-4">
                {(documents.find((d) => d.id === fullQuizDocId) || activeDoc).chapters
                  .flatMap((c) => c.mcqs)
                  .filter((q) => fullQuizDiff === 'All' || q.difficulty === fullQuizDiff)
                  .map((q, idx) => {
                    const chosen = fullQuizAnswers[q.id];
                    const isAnswered = chosen !== undefined;
                    return (
                      <div
                        key={q.id}
                        className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 text-xs"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-sm text-slate-900">
                            {idx + 1}. {q.questionText}
                          </span>
                          <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                            {q.difficulty} &bull; Page {q.pageReference}
                          </span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {q.options.map((opt, oIdx) => {
                            let cls = 'bg-white hover:bg-slate-100 border-slate-200 text-slate-700';
                            if (isAnswered) {
                              if (oIdx === q.correctOptionIndex) {
                                cls = 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold';
                              } else if (oIdx === chosen) {
                                cls = 'bg-rose-50 border-rose-400 text-rose-900';
                              }
                            }
                            return (
                              <button
                                key={oIdx}
                                type="button"
                                onClick={() =>
                                  setFullQuizAnswers((prev) => ({ ...prev, [q.id]: oIdx }))
                                }
                                className={`p-3 rounded-xl border text-left transition-all ${cls}`}
                              >
                                <strong>{String.fromCharCode(65 + oIdx)}.</strong> {opt}
                              </button>
                            );
                          })}
                        </div>
                        {isAnswered && (
                          <div className="p-3 rounded-xl bg-white border border-slate-200 text-slate-600">
                            <strong className="text-emerald-700">
                              Verified Explanation (Page {q.pageReference}):
                            </strong>{' '}
                            {q.explanation}
                          </div>
                        )}
                      </div>
                    );
                  })}
              </div>
            </div>
          </section>
        )}

        {/* ===================================================================
            VIEW 5: STAGE 5 — STUDY HISTORY LOG
            =================================================================== */}
        {activeNav === 'history' && (
          <section className="space-y-5">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
                <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2 mb-3">
                  <Award className="w-4 h-4 text-emerald-600" />
                  <span>Recorded Quiz Attempts (`QuizAttempts`)</span>
                </h3>
                <div className="space-y-2.5 max-h-[480px] overflow-y-auto pr-1">
                  {quizAttempts
                    .slice()
                    .reverse()
                    .map((a) => (
                      <div
                        key={a.id}
                        className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs flex items-center justify-between"
                      >
                        <div>
                          <p className="font-bold text-slate-800">{a.docTitle}</p>
                          <p className="text-[11px] text-slate-500">
                            {a.chapterTitle} &bull; {a.difficulty} &bull; {a.date}
                          </p>
                        </div>
                        <span
                          className={`px-2.5 py-1 rounded-lg font-bold ${
                            a.percentage >= 80
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {a.percentage}% ({a.score}/{a.total})
                        </span>
                      </div>
                    ))}
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
                <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2 mb-3">
                  <Bookmark className="w-4 h-4 text-emerald-600" />
                  <span>Saved Chapter Summaries (`Summaries`)</span>
                </h3>
                <div className="space-y-2.5 max-h-[480px] overflow-y-auto pr-1">
                  {savedSummaries.map((s) => (
                    <div
                      key={s.id}
                      className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs"
                    >
                      <p className="font-bold text-slate-800">{s.chapterTitle}</p>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        {s.docTitle} &bull; Saved {s.date}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
                <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2 mb-3">
                  <MessageSquareText className="w-4 h-4 text-emerald-600" />
                  <span>Recent RAG Conversations (`Conversations`)</span>
                </h3>
                <div className="space-y-2.5 max-h-[480px] overflow-y-auto pr-1">
                  {Object.entries(conversations)
                    .flatMap(([docId, msgs]) => {
                      const doc = documents.find((d) => d.id === docId);
                      return msgs
                        .filter((m) => m.role === 'user')
                        .map((m, i) => ({
                          id: `${docId}-${i}`,
                          docTitle: doc ? doc.title : docId,
                          q: m.content
                        }));
                    })
                    .map((c) => (
                      <div
                        key={c.id}
                        className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs"
                      >
                        <span className="text-[10px] font-bold text-emerald-700 uppercase">
                          {c.docTitle}
                        </span>
                        <p className="text-slate-700 font-medium mt-0.5">&ldquo;{c.q}&rdquo;</p>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ===================================================================
            VIEW 6: MERN ARCHITECTURE, WORKFLOW DIAGRAM & API INSPECTOR
            =================================================================== */}
        {activeNav === 'blueprint' && (
          <section className="space-y-5">
            <div className="bg-[#0b1528] text-white p-6 rounded-2xl border border-slate-800 shadow-md">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-5">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-sky-400">
                    Complete Project Architecture
                  </span>
                  <h2 className="text-lg font-bold text-white mt-0.5">
                    End-to-End Application Workflow &amp; 5-Stage Roadmap
                  </h2>
                </div>
                <span className="text-xs px-3 py-1 rounded-full bg-sky-950 text-sky-300 border border-sky-700/60">
                  React + Vite &bull; Express.js &bull; MongoDB &bull; pdf-parse &bull; RAG LLM
                </span>
              </div>

              <div className="max-w-3xl mx-auto flex flex-col items-center space-y-2 text-xs font-semibold">
                <div className="px-6 py-2.5 rounded-xl bg-[#0d2847] border border-sky-700/60 text-sky-100 shadow">
                  1. Student uploads PDF (`POST /api/documents/upload`)
                </div>
                <div className="text-slate-400">↓</div>
                <div className="px-6 py-2.5 rounded-xl bg-[#0d2847] border border-sky-700/60 text-sky-100 shadow">
                  2. Backend validates file type (`.pdf`) &amp; size limit
                </div>
                <div className="text-slate-400">↓</div>
                <div className="px-6 py-2.5 rounded-xl bg-[#0d2847] border border-sky-700/60 text-sky-100 shadow">
                  3. Extract PDF text with page numbers (`pdf-parse` / `pdf.js`)
                </div>
                <div className="text-slate-400">↓</div>
                <div className="px-6 py-2.5 rounded-xl bg-[#0d2847] border border-sky-700/60 text-sky-100 shadow">
                  4. Split text into chapters, sections &amp; RAG chunks
                </div>
                <div className="text-slate-400">↓</div>
                <div className="px-6 py-2.5 rounded-xl bg-[#0d2847] border border-sky-700/60 text-sky-100 shadow">
                  5. Store document metadata &amp; extracted text in MongoDB
                </div>
                <div className="text-slate-400">↓</div>
                <div className="px-6 py-2.5 rounded-xl bg-emerald-950 border border-emerald-500/70 text-emerald-200 shadow font-bold">
                  6. AI Processing (Hosted LLM API + RAG Retrieval)
                </div>
                <div className="text-slate-400">↓</div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full text-center">
                  <div className="p-3 rounded-xl bg-[#0d2847] border border-sky-700/60 text-sky-100">
                    Chapter Summaries
                    <br />
                    <span className="text-[10px] text-sky-300 font-normal">`/summarize`</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#0d2847] border border-sky-700/60 text-sky-100">
                    MCQ Generation
                    <br />
                    <span className="text-[10px] text-sky-300 font-normal">`/generate-quiz`</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#0d2847] border border-sky-700/60 text-sky-100">
                    Document-Based Chat
                    <br />
                    <span className="text-[10px] text-sky-300 font-normal">`/chat` (RAG)</span>
                  </div>
                </div>
                <div className="text-slate-400">↓</div>
                <div className="px-6 py-2.5 rounded-xl bg-[#0d2847] border border-sky-700/60 text-sky-100 shadow">
                  7. Student Workspace &amp; Interactive Practice
                </div>
                <div className="text-slate-400">↓</div>
                <div className="px-6 py-2.5 rounded-xl bg-[#0d2847] border border-sky-700/60 text-sky-100 shadow">
                  8. Save quiz scores, summaries &amp; chat history (`POST /api/quizzes/attempts`)
                </div>
                <div className="text-slate-400">↓</div>
                <div className="px-6 py-2.5 rounded-xl bg-emerald-900/80 border border-emerald-500 text-white shadow">
                  9. Learning Progress Dashboard (`GET /api/history`)
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
              <div className="lg:col-span-6 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
                <h3 className="font-bold text-sm text-slate-900 mb-3">
                  9 REST API Endpoints (Express.js Backend)
                </h3>
                <div className="space-y-2 text-xs">
                  {[
                    { method: 'POST', path: '/api/documents/upload', desc: 'Upload PDF & extract chapters' },
                    { method: 'GET', path: '/api/documents', desc: "List user's PDFs" },
                    { method: 'GET', path: '/api/documents/:id', desc: 'Get document details & text' },
                    { method: 'POST', path: '/api/documents/:id/summarize', desc: 'Generate chapter summaries' },
                    { method: 'POST', path: '/api/documents/:id/generate-quiz', desc: 'Generate structured JSON MCQs' },
                    { method: 'POST', path: '/api/documents/:id/chat', desc: 'RAG Q&A with page references' },
                    { method: 'GET', path: '/api/documents/:id/questions', desc: 'Retrieve saved questions' },
                    { method: 'POST', path: '/api/quizzes/attempts', desc: 'Save quiz score & answers' },
                    { method: 'GET', path: '/api/history', desc: 'Retrieve study history & stats' }
                  ].map((ep, i) => (
                    <div
                      key={i}
                      className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between"
                    >
                      <div>
                        <span
                          className={`px-2 py-0.5 rounded font-mono font-bold text-[10px] ${
                            ep.method === 'POST'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-sky-100 text-sky-800'
                          }`}
                        >
                          {ep.method}
                        </span>
                        <code className="font-mono font-semibold ml-1">{ep.path}</code>
                      </div>
                      <span className="text-slate-500">{ep.desc}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-6 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-sm text-slate-900">
                    Live MongoDB Collection Inspector
                  </h3>
                  <div className="flex items-center gap-2">
                    <select
                      value={mongoCollection}
                      onChange={(e) => setMongoCollection(e.target.value)}
                      className="text-xs border border-slate-200 rounded-lg px-2.5 py-1 bg-slate-50 font-semibold text-slate-700"
                    >
                      <option value="Documents">Collection: Documents</option>
                      <option value="Summaries">Collection: Summaries</option>
                      <option value="Questions">Collection: Questions</option>
                      <option value="QuizAttempts">Collection: QuizAttempts</option>
                      <option value="Conversations">Collection: Conversations</option>
                    </select>
                    <button
                      type="button"
                      onClick={() => {
                        try {
                          const t = document.createElement('textarea');
                          t.value = mongoJsonString;
                          document.body.appendChild(t);
                          t.select();
                          document.execCommand('copy');
                          document.body.removeChild(t);
                        } catch (e) {}
                        triggerToast('Copied MongoDB JSON document to clipboard!');
                      }}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700"
                    >
                      Copy JSON
                    </button>
                  </div>
                </div>
                <pre className="flex-1 bg-slate-900 text-emerald-300 font-mono text-[11px] p-4 rounded-xl overflow-auto max-h-[360px]">
                  {mongoJsonString}
                </pre>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* STUDENT PROFILE MODAL */}
      {showProfileModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 max-w-md w-full p-5 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-base text-slate-900">
                Student Profile &amp; AI Preferences
              </h3>
              <button
                type="button"
                onClick={() => setShowProfileModal(false)}
                className="text-slate-400 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setShowProfileModal(false);
                triggerToast('Updated student profile!');
              }}
              className="space-y-3 mt-4 text-xs"
            >
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={studentProfile.name}
                  onChange={(e) =>
                    setStudentProfile((p) => ({ ...p, name: e.target.value }))
                  }
                  className="w-full px-3 py-2 rounded-xl border border-slate-200"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Academic Email</label>
                <input
                  type="email"
                  value={studentProfile.email}
                  onChange={(e) =>
                    setStudentProfile((p) => ({ ...p, email: e.target.value }))
                  }
                  className="w-full px-3 py-2 rounded-xl border border-slate-200"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Target Examination / Track
                </label>
                <input
                  type="text"
                  value={studentProfile.target}
                  onChange={(e) =>
                    setStudentProfile((p) => ({ ...p, target: e.target.value }))
                  }
                  className="w-full px-3 py-2 rounded-xl border border-slate-200"
                />
              </div>
              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowProfileModal(false)}
                  className="px-3.5 py-2 rounded-xl border border-slate-200 text-slate-600 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-semibold"
                >
                  Save Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* TOAST BANNER */}
      {toastMessage && (
        <div className="fixed bottom-4 right-4 z-50 px-4 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-semibold shadow-lg flex items-center gap-2 border border-emerald-500/40">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
