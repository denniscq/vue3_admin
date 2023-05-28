<template>
  <div class="visual-block">
    <div class="line-1">
      <span>Target</span>
      <span>{{ report.target.people }}</span>
      <span>{{ report.target.computer }}</span>
      <span>{{ report.target.phone }}</span>
      <span>{{ report.target.mail }}</span>
      <span>{{ report.target.edit }}</span>
      <span>{{ report.target.outlook }}</span>
    </div>
    <div class="line-2">
      <span>ToDo</span>
      <span>
        <pre>{{ report.todo.people }}</pre>
      </span>
      <span>
        <pre>{{ report.todo.computer }}</pre>
      </span>
      <span>
        <pre>{{ report.todo.phone }}</pre>
      </span>
      <span>
        <pre>{{ report.todo.mail }}</pre>
      </span>
      <span>
        <pre>{{ report.todo.edit }}</pre>
      </span>
      <span>
        <pre>{{ report.todo.outlook }}</pre>
      </span>
    </div>
    <div class="line-3">
      <span>
        <svg-icon
          name="calculate"
          color="lightgreen"
          background="transparent"
          width="18px"
          height="18px"
        ></svg-icon>
      </span>
      <span>{{ report.pending.people }}</span>
      <span>{{ report.pending.computer }}</span>
      <span>{{ report.pending.phone }}</span>
      <span>{{ report.pending.mail }}</span>
      <span>{{ report.pending.edit }}</span>
      <span>{{ report.pending.outlook }}</span>
    </div>
    <div class="line-4">
      <span>
        <svg-icon
          name="correct"
          color="rgba(128, 128, 128, 0.5)"
          background="transparent"
          width="18px"
          height="18px"
        ></svg-icon>
      </span>
      <span>{{ report.done.people }}</span>
      <span>{{ report.done.computer }}</span>
      <span>{{ report.done.phone }}</span>
      <span>{{ report.done.mail }}</span>
      <span>{{ report.done.edit }}</span>
      <span>{{ report.done.outlook }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { schedule } from '@/models/hcp_model'
import { ref, Ref } from 'vue'
const props = defineProps(['data', 'periodStart', 'periodEnd'])

const typeObj = {
  people: 0,
  computer: 0,
  phone: 0,
  mail: 0,
  edit: 0,
  outlook: 0,
}
const report: Ref<{ [key: string]: typeof typeObj }> = ref({
  target: {
    people: 0,
    computer: 0,
    phone: 0,
    mail: 0,
    edit: 0,
    outlook: 0,
  },
  todo: {
    people: 0,
    computer: 0,
    phone: 0,
    mail: 0,
    edit: 0,
    outlook: 0,
  },
  pending: {
    people: 0,
    computer: 0,
    phone: 0,
    mail: 0,
    edit: 0,
    outlook: 0,
  },
  done: {
    people: 0,
    computer: 0,
    phone: 0,
    mail: 0,
    edit: 0,
    outlook: 0,
  },
})

const calculate = (scheduleList: schedule[]) => {
  scheduleList.forEach((p) => {
    Object.keys(typeObj).forEach((key: string) => {
      if (p.category === key) {
        if (
          props.periodStart <= new Date(p.scheduleTime).getTime() &&
          new Date(p.scheduleTime).getTime() <= props.periodEnd
        ) {
          report.value.target[key as keyof typeof typeObj] += 1
          if (new Date(p.scheduleTime) > new Date()) {
            report.value.todo[key as keyof typeof typeObj] += 1
          } else {
            report.value.pending[key as keyof typeof typeObj] += 1
          }
        }
        if (
          props.periodStart <= new Date(p.confirmedTime).getTime() &&
          new Date(p.confirmedTime).getTime() <= props.periodEnd
        ) {
          report.value.target[key as keyof typeof typeObj] += 1
          report.value.done[key as keyof typeof typeObj] += 1
        }
      }
    })
  })
}

calculate(props.data as schedule[])
</script>

<style scoped lang="scss">
.visual-block {
  height: 100%;
  width: 100%;
  position: absolute;
  line-height: 25px;
  text-align: center;

  & span {
    width: 40px;
    height: 100%;
  }

  & > .line-1 {
    width: 100%;
    color: #000000;
    display: flex;

    & > span:first-child {
      font-weight: bold;
    }
  }

  & > .line-2 {
    color: blue;
    font-weight: bold;
    display: flex;

    & > span {
      & > pre {
        width: 25px;
        border: 1px solid blue;
        border-radius: 50%;
        margin-left: 8px;
        background-color: lightblue;
      }
    }
  }

  & > .line-3 {
    display: flex;
    height: 25px;
    color: lightgreen;

    & > span:first-child {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
  }

  & > .line-4 {
    display: flex;
    height: 25px;

    & > span:first-child {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
