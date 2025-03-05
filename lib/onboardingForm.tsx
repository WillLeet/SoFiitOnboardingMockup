import FormText from "@/components/FormText";
import FormTextInput from "@/components/FormTextInput";
import FormOptionSelect from "@/components/FormOptionSelect";
import FormMultiselect from "@/components/FormMultiselect";
import FormDropdown from "@/components/FormDropdown";
import FormMoodSelect from "@/components/FormMoodSelect";
import { StyleProp, View, TextStyle } from "react-native";

const FIELD_TYPES: { [type: string] : string; } = {
    DROPDOWN: 'dropdown',
    MOOD_SELECT: 'moodselect',
    MULTISELECT: 'multiselect',
    OPTION_SELECT: 'optionselect',
    TEXT: 'text',
    TEXT_INPUT: 'textinput'
}

type option = {
    label: string,
    icon?: string,
    value: string,
}

type fieldProps = {
    responseKey?: string
    label?: string
    options?: option[]
    placeholder?: string
    selectedColors?: string[]
    style?: StyleProp<TextStyle>,
    gapSize?: number,
    content?: string,
    inputType?: string,
};

type field = {
    type: string,
    props: fieldProps
}

class Page {
    keys: string[];
    content: field[];
    progressStage: number;
    pageNumber: number

    constructor(pageNumber: number, progressStage: number,content: field[]) {
        this.pageNumber = pageNumber
        this.content = content
        this.progressStage = progressStage
        this.keys = []
        for(const field of content){
            if(field.props.responseKey){
                this.keys.push(field.props.responseKey)
            }
        }
    }

    private renderField(field: field, changeFunction: Function, value: string = "", modalFunction: Function, activeModal: string) { 
        const props = field.props

        switch (field.type) {
            case FIELD_TYPES.TEXT:
                return (
                    <FormText
                    style={props.style!}
                    content={props.content!}
                    gapSize={props.gapSize!}
                    />
                )
            case FIELD_TYPES.TEXT_INPUT:
                return (
                    <FormTextInput
                    responseKey={props.responseKey!}
                    value={value}
                    label={props.label!}
                    placeholder={props.placeholder!}
                    inputType={props.inputType!}
                    onPress={changeFunction}
                    />
                )
            case FIELD_TYPES.OPTION_SELECT:
                return (
                    <FormOptionSelect
                    responseKey={props.responseKey!}
                    value={value}
                    onPress={changeFunction}
                    options={props.options!}
                    />
                )
            case FIELD_TYPES.MULTISELECT:
                return (
                    <FormMultiselect
                    responseKey={props.responseKey!}
                    value={value}
                    onPress={changeFunction}
                    selectedColors={props.selectedColors}
                    options={props.options!}
                    />
                )
            case FIELD_TYPES.DROPDOWN:
                return (
                    <FormDropdown
                    responseKey={props.responseKey!}
                    value={value}
                    onPress={changeFunction}
                    options={props.options!}
                    label={props.label!}
                    placeholder={props.placeholder!}
                    activeModal={activeModal}
                    modalToggle={modalFunction}
                    />
                )
            case FIELD_TYPES.MOOD_SELECT:
                return (
                    <FormMoodSelect
                    responseKey={props.responseKey!}
                    value={value}
                    onPress={changeFunction}
                    />
                )
            default:
                throw new Error(
                    `Undefined field type ${field.type}`
                  );
        }
    }

    render(valuesState: {[fieldName: string]: string}, changeFunction: Function, modalFunction: Function, activeModal: string) {
        return (
            this.content.map((field,index)=> { return (
                <View key={`p${this.pageNumber}f${index}`}>
                    {this.renderField(field, changeFunction,valuesState[field.props.responseKey!],modalFunction,activeModal)}
                </View>
            )})
        )
    }

    validateInputCompletion(valuesState: {[fieldName: string]: string}){
        for(const key of this.keys){
            if((valuesState[key] ?? "").length==0){
                return false
            }
        }
        return true
    }

}

let pageIndex = 0
const stage2Threshold = 6
const stage3Threshold = 10

const generatePage = (content: field[]) => {
    const progressStage = pageIndex >= stage3Threshold ? 3 : pageIndex >= stage2Threshold ? 2 : 1
    const page = new Page(pageIndex,progressStage,content)
    pageIndex += 1
    return page
}

const onboardingForm: Page[] = [
    generatePage([
        {
            type: FIELD_TYPES.TEXT,
            props: {
                style: {
                    fontSize: 32,
                    fontWeight: 500,
                    lineHeight: 40
                },
                gapSize: 20,
                content: "Which of these\napplies to you?"
            }
        },
        {
            type: FIELD_TYPES.OPTION_SELECT,
            props: {
                responseKey: "studentOrFaculty",
                options: [
                    {
                        label: "I'm a student",
                        icon: "📚",
                        value: "student"
                    },
                    {
                        label: "I'm faculty or staff",
                        icon: "💼",
                        value: "faculty"
                    }
                ]
            }
        }
    ]),
    generatePage([
        {
            type: FIELD_TYPES.TEXT,
            props: {
                style: {
                    fontSize: 28,
                    fontWeight: 500,
                    lineHeight: 40
                },
                gapSize: 20,
                content: "[User],\nwe care about all of you. 🌱"
            }
        },
        {
            type: FIELD_TYPES.TEXT,
            props: {
                style: {
                    fontSize: 16,
                },
                content: "Finish setting up your account to: take care of your mind, move your body, and find people who get you."
            }
        },
    ]),
    generatePage([
        {
            type: FIELD_TYPES.TEXT,
            props: {
                style: {
                    fontSize: 28,
                    fontWeight: 500,
                    lineHeight: 40
                },
                content: "Let's verify your\nphone number"
            }
        },
        {
            type: FIELD_TYPES.TEXT_INPUT,
            props: {
                label: "",
                placeholder: "(xxx)-xxx-xxxx",
                inputType: "phone",
                responseKey: "phoneNumber"
            }
        },
        {
            type: FIELD_TYPES.TEXT,
            props: {
                style: {
                    fontSize: 16,
                    color: "#7C7C7C"
                },
                content: "By entering your number, you agree to receive updates and personalized text messages. Reply STOP to opt out. Msg & data rates may apply."
            }
        },
    ]),
    generatePage([
        {
            type: FIELD_TYPES.TEXT,
            props: {
                style: {
                    fontSize: 28,
                    fontWeight: 500,
                    lineHeight: 40
                },
                content: "Enter your\nverification code"
            }
        },
        {
            type: FIELD_TYPES.TEXT_INPUT,
            props: {
                label: "Enter code below",
                placeholder: "xxxxxx",
                inputType: "number",
                responseKey: "verifCode"
            }
        },
    ]),
    generatePage([
        {
            type: FIELD_TYPES.TEXT_INPUT,
            props: {
                label: "First name",
                placeholder: "First name",
                inputType: "default",
                responseKey: "firstName"
            }
        },
        {
            type: FIELD_TYPES.TEXT_INPUT,
            props: {
                label: "Last name",
                placeholder: "Last name",
                inputType: "default",
                responseKey: "lastName"
            }
        },
        {
            type: FIELD_TYPES.DROPDOWN,
            props: {
                label: "Gender identity",
                placeholder: "Your gender",
                responseKey: "genderIdentity",
                options: [
                    {
                        label: "Male",
                        value: "male"
                    },
                    {
                        label: "Female",
                        value: "female"
                    },
                    {
                        label: "Trans Male/Trans Man",
                        value: "transMale"
                    },
                    {
                        label: "Trans Female/Trans Woman",
                        value: "transFemale"
                    },
                    {
                        label: "Genderqueer/Gender non-conforming",
                        value: "genderqueer"
                    },
                    {
                        label: "Non-binary",
                        value: "nonbinary"
                    },
                    {
                        label: "I prefer not to identify",
                        value: "X"
                    },
                ]
            },
        },
        {
            type: FIELD_TYPES.TEXT_INPUT,
            props: {
                label: "Birthday",
                placeholder: "mm/dd/yyyy",
                inputType: "default",
                responseKey: "birthday"
            }
        },
    ]),
    generatePage([
        {
            type: FIELD_TYPES.DROPDOWN,
            props: {
                label: "College or school",
                placeholder: "College of Arts",
                responseKey: "schoolName",
                options: [
                    {
                        label: "Viterbi",
                        value: "viterbi"
                    },
                    {
                        label: "Marshall",
                        value: "marshall"
                    },
                    {
                        label: "Dornsife",
                        value: "dornsife"
                    },
                    {
                        label: "Annenberg",
                        value: "annenberg"
                    },
                    {
                        label: "Iovine and Young Academy",
                        value: "iovine&young"
                    },
                    {
                        label: "Leventhal",
                        value: "leventhal"
                    },
                    {
                        label: "Architecture",
                        value: "architecture"
                    }
                ]
            }
        },
        {
            type: FIELD_TYPES.DROPDOWN,
            props: {
                label: "Student type",
                placeholder: "Student type",
                responseKey: "studentType",
                options: [
                    {
                        label: "Domestic Student",
                        value: "domestic"
                    },
                    {
                        label: "International Student",
                        value: "international"
                    }
                ]
            }
        },
        {
            type: FIELD_TYPES.DROPDOWN,
            props: {
                label: "Degree",
                placeholder: "Degree",
                responseKey: "degree",
                options: [
                    {
                        label: "Bachelors",
                        value: "bachelors"
                    },
                    {
                        label: "Masters",
                        value: "masters"
                    },
                    {
                        label: "PhD or Professional Doctorate",
                        value: "phd"
                    },
                    {
                        label: "Non-degree",
                        value: "nondegree"
                    }
                ]
            }
        },
        {
            type: FIELD_TYPES.DROPDOWN,
            props: {
                label: "Source",
                placeholder: "How did you hear about us?",
                responseKey: "source",
                options: [
                    {
                        label: "Friends",
                        value: "friends"
                    },
                    {
                        label: "Events",
                        value: "events"
                    },
                    {
                        label: "Flyers",
                        value: "flyers"
                    },
                    {
                        label: "Social media",
                        value: "socialmedia"
                    },
                    {
                        label: "Student clubs",
                        value: "studentclubs"
                    },
                    {
                        label: "On-campus gym",
                        value: "oncampusgym"
                    },
                    {
                        label: "On-campus clinic",
                        value: "oncampusclinic"
                    },
                    {
                        label: "Other",
                        value: "other"
                    }
                ]
            }
        }
    ]),
    generatePage([
        {
            type: FIELD_TYPES.TEXT,
            props: {
                style: {
                    fontSize: 80,
                    alignSelf: 'center',
                    paddingTop: 50
                },
                content: "🧘‍♀️"
            }
        },
        {
            type: FIELD_TYPES.TEXT,
            props: {
                style: {
                    fontSize: 28,
                    fontWeight: 500,
                    lineHeight: 35
                },
                content: "Start your first vibe check and set a workout goal."
            }
        },
        {
            type: FIELD_TYPES.TEXT,
            props: {
                style: {
                    fontSize: 16,
                },
                content: "Track your mental and physical wellbeing by answering two questions every two weeks, and logging your workouts. "
            }
        },
    ]),
    generatePage([
        {
            type: FIELD_TYPES.TEXT,
            props: {
                style: {
                    fontSize: 28,
                    fontWeight: 500,
                    lineHeight: 35
                },
                content: "Are you engaged and\ninterested in your\ndaily activities?",
            }
        },
        {
            type: FIELD_TYPES.TEXT,
            props: {
                style: {
                    fontSize: 16,
                    color: "#3F0835"
                },
                content: "Question 1/2",
            }
        },
        {
            type: FIELD_TYPES.MOOD_SELECT,
            props: {
                responseKey: "dailyactivitysatisfaction"
            }
        }
    ]),
    generatePage([
        {
            type: FIELD_TYPES.TEXT,
            props: {
                style: {
                    fontSize: 28,
                    fontWeight: 500,
                    lineHeight: 35
                },
                content: "Do you feel supported and\nvalued by your peers?",
            }
        },
        {
            type: FIELD_TYPES.TEXT,
            props: {
                style: {
                    fontSize: 16,
                    color: "#3F0835"
                },
                content: "Question 2/2",
            }
        },
        {
            type: FIELD_TYPES.MOOD_SELECT,
            props: {
                responseKey: "peersatisfaction"
            }
        }
    ]),
    generatePage([
        {
            type: FIELD_TYPES.TEXT,
            props: {
                style: {
                    fontSize: 28,
                    fontWeight: 500,
                    lineHeight: 35
                },
                content: "Weekly workout goal",
            }
        },
        {
            type: FIELD_TYPES.TEXT,
            props: {
                style: {
                    fontSize: 16,
                    color: "#3F0835"
                },
                content: "The CDC suggests staying active at least 3 days a week for 50 minutes each time, for better health and vibes.",
            }
        },
        {
            type: FIELD_TYPES.OPTION_SELECT,
            props: {
                responseKey: "daysperweekgoal",
                options: [
                    {
                        label: "1 day",
                        value: "1"
                    },
                    {
                        label: "2 days",
                        value: "2"
                    },
                    {
                        label: "3 days",
                        value: "3"
                    },
                    {
                        label: "4 days",
                        value: "4"
                    },
                    {
                        label: "5 days",
                        value: "5"
                    },
                    {
                        label: "6 days",
                        value: "6"
                    },
                    {
                        label: "7 days",
                        value: "7"
                    }
                ]
            }
        }
    ]),
    generatePage([
        {
            type: FIELD_TYPES.TEXT,
            props: {
                style: {
                    fontSize: 28,
                    fontWeight: 500,
                    lineHeight: 35
                },
                content: "You're almost in.",
            }
        },
        {
            type: FIELD_TYPES.TEXT,
            props: {
                style: {
                    fontSize: 16,
                    color: "#3F0835"
                },
                content: "Complete your profile to meet people on campus with similar interests and goals. You’ll get your first match today."
            }
        },
    ]),
    generatePage([
        {
            type: FIELD_TYPES.TEXT,
            props: {
                style: {
                    fontSize: 28,
                    fontWeight: 500,
                    lineHeight: 35
                },
                content: "What are your\ncurrent goals?",
            }
        },
        {
            type: FIELD_TYPES.TEXT,
            props: {
                style: {
                    fontSize: 16,
                    color: "#7C7C7C"
                },
                content: "Select up to 3"
            },
        },
        {
            type: FIELD_TYPES.OPTION_SELECT,
            props: {
                responseKey: "currentGoals",
                options: [
                    {
                        label: "Increase physical activity",
                        value: "increaseactivity",
                        icon: "🏃"
                    },
                    {
                        label: "Reduce stress",
                        value: "reducestress",
                        icon: "🌿"
                    },
                    {
                        label: "Make new friends",
                        value: "newfriends",
                        icon: "🤝"
                    },
                    {
                        label: "Join group activities",
                        value: "groupactivities",
                        icon: "🏅"
                    },
                    {
                        label: "Sleep better",
                        value: "sleep",
                        icon: "💤"
                    },
                    {
                        label: "Learn a new skill",
                        value: "newskill",
                        icon: "🎨"
                    },
                    {
                        label: "Practice self-care",
                        value: "selfcare",
                        icon: "❤️"
                    },
                    {
                        label: "Find a community",
                        value: "community",
                        icon: "🌅"
                    }
                ]
            }
        },
    ]),
    generatePage([
        {
            type: FIELD_TYPES.TEXT,
            props: {
                style: {
                    fontSize: 28,
                    fontWeight: 500,
                    lineHeight: 35
                },
                content: "Pick your\ngo-to activities",
            }
        },
        {
            type: FIELD_TYPES.TEXT,
            props: {
                style: {
                    fontSize: 16,
                    color: "#7C7C7C"
                },
                content: "Select all that apply"
            },
        },
        {
            type: FIELD_TYPES.MULTISELECT,
            props: {
                responseKey: "preferredactivities",
                selectedColors: ["#FEE7D3","#E49375"],
                options: [
                    {
                        label: "Weightlifting",
                        value: "weightlifting",
                        icon: "🏋️‍️"
                    },
                    {
                        label: "Running",
                        value: "running",
                        icon: "🏃️‍️"
                    },
                    {
                        label: "Soccer",
                        value: "soccer",
                        icon: "⚽️️‍️"
                    },
                    {
                        label: "Cycling",
                        value: "cycling",
                        icon: "🚴️️‍️"
                    },
                    {
                        label: "Yoga",
                        value: "yoga",
                        icon: "🧘️️‍️"
                    },
                    {
                        label: "Swimming",
                        value: "swimming",
                        icon: "️️‍️🏊"
                    },
                    {
                        label: "Boxing",
                        value: "boxing",
                        icon: "🥊"
                    },
                    {
                        label: "Climbing",
                        value: "climbing",
                        icon: "️️‍️🧗"
                    },
                    {
                        label: "Walking",
                        value: "walking",
                        icon: "️️‍️🚶"
                    },
                    {
                        label: "Basketball",
                        value: "basketball",
                        icon: "️️‍️🏀"
                    },
                    {
                        label: "Football",
                        value: "football",
                        icon: "🏈"
                    },
                    {
                        label: "Pickleball",
                        value: "pickleball",
                        icon: "🏓"
                    },
                    {
                        label: "Badminton",
                        value: "badminton",
                        icon: "🏸"
                    },
                    {
                        label: "Tennis",
                        value: "tennis",
                        icon: "🎾"
                    },
                    {
                        label: "Pilates",
                        value: "pilates",
                        icon: "🧶"
                    },
                    {
                        label: "Martial arts",
                        value: "martialarts",
                        icon: "🥋"
                    },
                    {
                        label: "Hiking",
                        value: "hiking",
                        icon: "🚶"
                    },
                    {
                        label: "Dog walking",
                        value: "dogwalking",
                        icon: "🐕"
                    },
                    {
                        label: "Kayaking",
                        value: "kayaking",
                        icon: "🚣"
                    },
                    {
                        label: "Dancing",
                        value: "dancing",
                        icon: "🕺"
                    },
                    {
                        label: "Puzzles",
                        value: "puzzles",
                        icon: "🧩"
                    },
                    {
                        label: "Gaming",
                        value: "gaming",
                        icon: "🎮"
                    },
                    {
                        label: "Reading",
                        value: "reading",
                        icon: "📚"
                    },
                    {
                        label: "Crafting",
                        value: "crafting",
                        icon: "🧵"
                    },
                    {
                        label: "Cooking",
                        value: "cooking",
                        icon: "🍳"
                    },
                    {
                        label: "Movies",
                        value: "movies",
                        icon: "🎥"
                    },
                    {
                        label: "Other",
                        value: "other",
                        icon: "🔄"
                    }

                ]
            }
        },
    ]),
    generatePage([
        {
            type: FIELD_TYPES.TEXT,
            props: {
                style: {
                    fontSize: 28,
                    fontWeight: 500,
                    lineHeight: 35
                },
                content: "Which best\ndescribes you?",
            }
        },
        {
            type: FIELD_TYPES.TEXT,
            props: {
                style: {
                    fontSize: 16,
                    color: "#7C7C7C"
                },
                content: "Select up to 3"
            },
        },
        {
            type: FIELD_TYPES.MULTISELECT,
            props: {
                responseKey: "descriptors",
                selectedColors: ["#F9DCF3","#DC7CC8"],
                options: [
                    {
                        label: "First-gen",
                        value: "firstgen",
                        icon: "📖"
                    },
                    {
                        label: "LGTBQ+",
                        value: "lgbt",
                        icon: "🏳️‍🌈"
                    },
                    {
                        label: "Student-parent",
                        value: "parent",
                        icon: "👶"
                    },
                    {
                        label: "International",
                        value: "international",
                        icon: "🌎"
                    },
                    {
                        label: "Multilingual",
                        value: "multilingual",
                        icon: "📕"
                    },
                    {
                        label: "Athlete",
                        value: "athlete",
                        icon: "🏋️‍"
                    },
                    {
                        label: "Commuter",
                        value: "commuter",
                        icon: "🥳‍"
                    },
                    {
                        label: "Transfer",
                        value: "transfer",
                        icon: "→"
                    },
                    {
                        label: "Veteran",
                        value: "veteran",
                        icon: "🎖"
                    },
                    {
                        label: "Accessibility needs",
                        value: "accessibility",
                        icon: "🦽"
                    },
                    {
                        label: "STEM",
                        value: "stem",
                        icon: "🧪"
                    },
                    {
                        label: "Part-time",
                        value: "parttime",
                        icon: "½"
                    },
                    {
                        label: "Online learner",
                        value: "onlinelearner",
                        icon: "💻"
                    },
                    {
                        label: "Career Changer",
                        value: "careerchange",
                        icon: "🏅"
                    },
                    {
                        label: "Out of state",
                        value: "outofstate",
                        icon: "🛬"
                    },
                    {
                        label: "Student worker",
                        value: "studentworker",
                        icon: "🧑‍💻"
                    },
                    {
                        label: "Greek life",
                        value: "greeklife",
                        icon: "🏛"
                    },
                    {
                        label: "Full-time",
                        value: "fulltime",
                        icon: "💯"
                    }
                ]
            }
        },
    ]),
    generatePage([
        {
            type: FIELD_TYPES.TEXT,
            props: {
                style: {
                    fontSize: 28,
                    fontWeight: 500,
                    lineHeight: 35
                },
                content: "Additional buddy preferences",
            }
        },
        {
            type: FIELD_TYPES.DROPDOWN,
            props: {
                label: "",
                placeholder: "Gender preference",
                responseKey: "genderPreference",
                options: [
                    {
                        label: "No preference",
                        value: "none"
                    },
                    {
                        label: "Male",
                        value: "male"
                    },
                    {
                        label: "Female",
                        value: "female"
                    },
                    {
                        label: "Trans Male/Trans Man",
                        value: "transMale"
                    },
                    {
                        label: "Trans Female/Trans Woman",
                        value: "transFemale"
                    },
                    {
                        label: "Genderqueer/Gender non-conforming",
                        value: "genderqueer"
                    },
                    {
                        label: "Non-binary",
                        value: "nonbinary"
                    }
                ]
            },
        },
    ]),
    generatePage([
        {
            type: FIELD_TYPES.TEXT,
            props: {
                style: {
                    fontSize: 28,
                    fontWeight: 500,
                    lineHeight: 35
                },
                content: "Tell your future\nbuddy about yourself"
            }
        },
        {
            type: FIELD_TYPES.TEXT,
            props: {
                style: {
                    fontSize: 16,
                    color: "#3F0835"
                },
                content: "Share something unique to help start a conversation."
            }
        },
        {
            type: FIELD_TYPES.TEXT_INPUT,
            props: {
                label: "",
                placeholder: "My name is...",
                inputType: "multiline",
                responseKey: "profilebio"
            }
        },
        {
            type: FIELD_TYPES.DROPDOWN,
            props: {
                responseKey: "icebreaker",
                label: "Ask your buddy a question",
                placeholder: "Choose...",
                options: [
                    {
                        label: "What do you do for fun?",
                        value: "hobbies"
                    },
                    {
                        label: "Wanna workout together?",
                        value: "workout"
                    },
                    {
                        label: "Any fun plans for the weekend?",
                        value: "weekendplans"
                    },
                    {
                        label: "Know any cool study spots nearby?",
                        value: "studyspots"
                    },
                    {
                        label: "Got any recs for a good walk or hike nearby?",
                        value: "walkrecs"
                    }
                ]
            }
        }
    ])
]

export default onboardingForm;
