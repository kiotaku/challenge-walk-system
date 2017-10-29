class CheckPoint < ApplicationRecord
  belongs_to :previous_check_point, class_name: 'CheckPoint', optional: true
  has_one :next_check_point, class_name: 'CheckPoint', foreign_key: 'previous_check_point_id'
  has_many :check_point_statuses

  scope :start, -> { find_by(previous_check_point_id: nil) }

  scope :nth, -> (n) {
    if n < 1 || count <= n
      raise RangeError, 'number is over check point length'
    end
    check_point = start
    (n - 1).times do
      check_point = check_point.next
    end
    check_point
  }

  scope :end, -> {
    where.not(id: pluck(:previous_check_point_id)).first
  }

  def self.sequence
    result = []
    current = start
    result << current
    while current = current.next_check_point
      result << current
    end
    result
  end
end
