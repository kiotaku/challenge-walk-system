class CheckPointStatus < ApplicationRecord
  belongs_to :user
  belongs_to :check_point

  scope :with_check_point_info, -> { joins(:check_point) }
  scope :search_with_name, -> (name) { joins(:check_point).find_by(check_points: { name: name }) }

  scope :not_pass, -> { where.not(status: 'pass')  }

  scope :start, -> {
    with_check_point_info.find_by(check_points: { previous_check_point_id: nil })
  }

  scope :nth, -> (n) {
    if n < 1 || count <= n
      raise RangeError, 'number is over check point length'
    end
    check_point_status = start
    (n - 1).times do
      check_point_status = check_point_status.next
    end
    check_point_status
  }

  scope :end, -> {
    with_check_point_info.where.not(check_points: { id: with_check_point_info.pluck('check_points.previous_check_point_id') }).first
  }

  scope :sequence, -> {
    CheckPoint.sequence.map do |check_point|
      find_by(check_point_id: check_point.id)
    end
  }

  STATUS = [
    'not pass',
    'pass',
    'retire'
  ]

  def pass
    if previous && previous.status == 'not pass'
      raise PreviousCheckPointNotPassError
    end
    result = update status: 'pass'
    result
  end

  def previous
    check_point.previous_check_point ? check_point.previous_check_point.check_point_statuses.find_by(user_id: user_id) : nil
  end

  def next
    check_point.next_check_point.check_point_statuses.find_by(user_id: user_id)
  end

  def retire
    update status: 'retire'
  end

  def summary
    attributes.slice('status')
  end
end
